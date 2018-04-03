$(() => {
    const $btnSubmit = $('#btn-submit');
    const $btnNickname = $('#btn-nickname');
    const $inputMsg = $('#input-msg');
    const $inputNickname = $('#input-nickname');
    const $chatPanel = $('#chat-panel');
    const $memberPanel = $('#member-panel');
    const meta = document.querySelector('meta[name=roomID]');
    const socket = io.connect();

    const nickname = window.prompt('Please input your nickname.');
    $('#nav-nickname').html(`Welcome! ${nickname}`);

    socket.on('message', (nickname, message, time) => {
        addItems([{
            nickname: nickname,
            body: message
        }]);
    });

    socket.on('memberList', (mList) => {
        addMemberItems(mList);
    });

    socket.emit('join', meta.content, nickname, (history) => {
        history.sort((a, b) => a.time - b.time);
        $chatPanel.empty();
        addItems(history);
        console.log('JOIN success!');
    });

    // receive();
    // setInterval(receive, 500);

    $inputMsg.bind('keypress', (e) => {
        if (e.keyCode === 13) {
            send();
        }
    });

    $btnSubmit.click(() => {
        send();
    });

    $btnNickname.click(() => {
        const newName = $inputNickname.val();
        if (!newName) return;
        socket.emit('nickname', newName);
        $('#nav-nickname').html(`Welcome! ${newName}`);
    });

    function send() {
        const msg = $inputMsg.val();
        if (!msg) return;
        $inputMsg.val('');
        socket.emit('message', msg);
        // $.post(`/chatroom/${meta.content}/postMessage`, {
        //     nickname: nickname,
        //     body: msg,
        //     room: meta.content,
        // }, (res) => {
        //     // console.log(res);
        // });
    }

    // function receive() {
    //     $.post(`/chatroom/${meta.content}/getHistory`, (res) => {
    //         res.sort((a, b) => a.time - b.time);
    //         $chatPanel.empty();
    //         addItems(res);
    //     });
    // }

    function addItems(messages) {
        for (const item of messages) {
            const c = Math.abs(item.nickname.length * parseInt(item.nickname[0].charCodeAt() - 65)) % 255;
            const color = `rgb(${c}, ${c*2 % 255}, ${c*5 % 255})`;
            const $item =
                $('<div class="item-container">' +
                    `<span class="item-nickname" style='color: ${color}'>${item.nickname}</span>` +
                    ' : ' +
                    `<span>${item.body}</span>` +
                    '</div>');
            $chatPanel.append($item);
        }
    }

    function addMemberItems(members) {
        $memberPanel.empty();
        for (const item of members) {
            const c = Math.abs(item.nickname.length * parseInt(item.nickname[0].charCodeAt() - 65)) % 255;
            const color = `rgb(${c}, ${c*2 % 255}, ${c*5 % 255})`;
            const $item =
                $('<div class="item-container">' +
                    `<span class="item-nickname" style='color: ${color}'>${item.nickname}</span>` +
                    '</div>');
            $memberPanel.append($item);
        }
    }
});