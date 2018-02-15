// Your SwiftFeed JavaScript code goes here
var $tweetsContainer = $('#tweets-container');
var $btnSwitch = $('#btn-switch');
var nowData = [];
var dupDic = [];
var updating = true;
var timerId = null;

$(function() {
    timerId = setInterval(getTweets, 5000);
});

$btnSwitch.click(function() {
    if (updating === true) {
        updating = false;
        $btnSwitch.text('Start');
        clearInterval(timerId);
    } else {
        updating = true;
        $btnSwitch.text('Stop');
        timerId = setInterval(getTweets, 5000);
    }
});

function getTweets() {
    $.get('http://ec2-18-218-249-183.us-east-2.compute.amazonaws.com/feed/start', function(data, status) {
        if (status === 'success') {
            var tData = clearDup(data);
            tData.sort(function(a,b) {return b['timestamp_ms'] - a['timestamp_ms']});
            updateData(tData);
            updateUI();
        } else {
            console.error('GET FAILED: ', status)
        }
    });
}

function updateData(nxtData) {
    var dupCnt = 0;
    for (var i = 0; i < nowData.length; i++) {
        for (var j = 0; j < nxtData.length; j++) {
            if (nowData[i].id === nxtData[j].id) {
                dupCnt++;
                break;
            }
        }
    }

    for (i = 0; i < nowData.length + nxtData.length - 26; i++) nowData.pop();
    nowData = nxtData.concat(nowData);
}

function updateUI() {
    $tweetsContainer.empty();
    for (var i = 0; i< nowData.length; i++) {
        var item = nowData[i];
        var imgUrl = 'img/no_photo.png';
        if (item['user'].hasOwnProperty('profile_image_url') && !!item['user']['profile_image_url']) imgUrl = item['user']['profile_image_url'];
        var $item = $(
            '<li class="collection-item avatar">' +
                '<img src="' + imgUrl + '" class="circle">' +
                '<span class="title">' + item['user']['name'] + '</span>' +
                '<p>' + item['text'] + '</p>' +
            '</li>');
        $tweetsContainer.append($item);
    }
}

function clearDup(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (dupDic.hasOwnProperty(item.id)) continue;
        dupDic[item.id] = true;
        res.push(item);
    }
    return res;
}