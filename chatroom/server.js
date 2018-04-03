const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const colors = require('colors');
const babel = require('@babel/core');

const index = require('./routes/index');
const lobby = require('./routes/lobby');
const chatroom = require('./routes/chatroom');

const db = require('any-db');
const conn = db.createConnection('sqlite3://chatroom.db');

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    conn.query('SELECT count(*) FROM sqlite_master WHERE type="table" and name="message"', (err, data) => {
        const num = data.rows[0]['count(*)'];
        if (num === 1) next();
        else {
            conn.query('CREATE TABLE message (id INTEGER PRIMARY KEY AUTOINCREMENT,room TEXT,nickname TEXT,body TEXT,time INTEGER)', (err, data) => {
                next();
            });
        }
    });
});
app.use((req, res, next) => {
    conn.query('SELECT count(*) FROM sqlite_master WHERE type="table" and name="room"', (err, data) => {
        const num = data.rows[0]['count(*)'];
        if (num === 1) next();
        else {
            conn.query('CREATE TABLE room (id TEXT PRIMARY KEY)', (err, data) => {
                next();
            });
        }
    });
});

// Routes
app.use('/', index);
app.use('/lobby', lobby);
app.use('/chatroom', chatroom);

// 404
app.use((req, res) => {
    res.status = 404;
    res.json('error');
});


// Socket.IO
const server = http.createServer(app);
const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    // User join room
    socket.on('join', (roomName, nickName, cb) => {
        socket.join(roomName);
        socket.nickname = nickName;
        socket.roomname = roomName;
        conn.query('SELECT nickname,body,time FROM message WHERE room=$1', [roomName], (err, data) => {
            cb(data.rows);
        });
        emitChangeMember(roomName);
    });

    // User change nickname
    socket.on('nickname', (nickname) => {
        socket.nickname = nickname;
        emitChangeMember(socket.roomname);
    });

    // User send message
    socket.on('message', (message) => {
        const time = Date.now();

        // Save in db
        conn.query('INSERT INTO message (body,nickname,room,time) VALUES($1,$2,$3,$4)', [
            message,
            socket.nickname,
            socket.roomname,
            time,
        ], (err, data) => {
            // console.log(data);
        });

        // Broadcast in the room
        io.sockets.in(socket.roomname).emit('message', socket.nickname, message, time);
    });

    // User disconnect
    socket.on('disconnect', () => {
        emitChangeMember(socket.roomname);
        socket.leave(socket.roomname);
    });

    function emitChangeMember(roomName) {
        if (!io.sockets.adapter.rooms[roomName]) return;
        const clients = Object.keys(io.sockets.adapter.rooms[roomName].sockets).map((id) => {
            return {nickname: io.sockets.connected[id].nickname};
        });
        io.sockets.in(roomName).emit('memberList', clients);
    }
});

server.listen(8080);
console.log('Server is listening to port 8080.'.green);