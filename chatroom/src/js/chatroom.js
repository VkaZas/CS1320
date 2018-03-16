$(() => {
    const $btnSubmit = $('#btn-submit');
    const $inputMsg = $('#input-msg');
    const $chatPanel = $('#chat-panel');
    const meta = document.querySelector('meta[name=roomID]');

    const nickname = window.prompt('Please input your nickname.');
    $('#nav-nickname').html(`Welcome! ${nickname}`);

    receive();
    setInterval(receive, 500);

    $inputMsg.bind('keypress', (e) => {
        if (e.keyCode === 13) {
            send();
        }
    });

    $btnSubmit.click(() => {
        send();
    });

    function send() {
        const msg = $inputMsg.val();
        if (!msg) return;
        $inputMsg.val('');
        $.post(`/chatroom/${meta.content}/postMessage`, {
            nickname: nickname,
            body: msg,
            room: meta.content,
        }, (res) => {
            // console.log(res);
        });
    }

    function receive() {
        $.post(`/chatroom/${meta.content}/getHistory`, (res) => {
            res.sort((a, b) => a.time - b.time);
            $chatPanel.empty();

            for (const item of res) {
                const c = Math.abs(item.nickname.length * parseInt(item.nickname[0].charCodeAt() - 65)) % 255;
                const color = `rgb(${c}, ${c*2 % 255}, ${c*5 % 255})`;
                const $item =
                    $('<div class="item-container">' +
                        `<span class="item-nickname" style='color: ${color}'>${item.nickname}</span>` +
                        ':' +
                        `<span>${item.body}</span>` +
                        '</div>');
                $chatPanel.append($item);
            }
        });
    }
});