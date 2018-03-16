const express = require('express');
const router = express.Router();
const uuidv1 = require('uuid/v1');
const db = require('any-db');
const conn = db.createConnection('sqlite3://chatroom.db');

router.get('/', (req, res) => {
    conn.query('SELECT id FROM room', (err, data) => {
        const rooms = data.rows;
        res.render('lobby', {
            title: 'Lobby',
            logo_title: 'Lobby',
            rooms: rooms,
            type: 0
        });
    });

});

router.post('/addroom', (req, res) => {
    console.log('/addroom'.red);
    const roomID = uuidv1().substr(0, 6);
    conn.query('INSERT INTO room VALUES($1)', [roomID], (err, data) => {
        console.log(err, data);
    });
});

module.exports = router;