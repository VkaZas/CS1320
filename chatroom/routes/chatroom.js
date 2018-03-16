const express = require('express');
const router = express.Router();
const db = require('any-db');
const conn = db.createConnection('sqlite3://chatroom.db');

router.get('/:roomid', (req, res) => {
    const roomID = req.params.roomid;
    // conn.query('SELECT id, nickname, body, id FROM message WHERE room = $1', [roomID], (err, data) => {
    //
    // });
    res.render('chatroom', {
        title: `Room ${roomID}`,
        type: 1,
        roomID: roomID,
        logo_title: `<Room ${roomID}`,
    })
});

router.post('/:roomid/postMessage', (req, res) => {
    conn.query('INSERT INTO message (body,nickname,room,time) VALUES($1,$2,$3,$4)', [
        req.body.body,
        req.body.nickname,
        req.body.room,
        Date.now(),
    ], (err, data) => {
        // console.log(err);
        // console.log(data);
    });
});

router.post('/:roomid/getHistory', (req, res) => {
    const roomID = req.params.roomid;
    conn.query('SELECT nickname,body,time FROM message WHERE room=$1', [roomID], (err, data) => {
        res.json(data.rows);
    });
});

module.exports = router;