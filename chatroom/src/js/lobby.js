$(() => {
    const $btnAddroom = $('#btn-addroom');

    $btnAddroom.click(() => {
        $.post('/lobby/addroom', {}, (res) => {
            console.log(res);
        });
    });
});