(function () {
    //TODO: Sau sẽ đẩy link (http://localhost:5001/messenger/modules/home/client/css/iframe_messenger.css) lên server helpdesk
    const  e = '<link rel="stylesheet" type="text/css" href="https://rawgit.com/ginneversmile/chat.embed.js/master/chat.embed.css"/>' +
        '<link rel="stylesheet" type="text/css" href="https://helpdesk.inet.vn/public/css/libs/font-awesome.css"/>' +
        '<div id="embed_chat"><a href="javascript:void(0)" id="embed_chat_avatar" class="txt-sz-2e"><i class="fa fa-bell"></i></a><div id="counter"></div></div>' +
        '<div id="embed_container">\n' +
        '    <div id="nav_iframe_bar">\n' +
        '        <small id="count-unread-message"></small>\n' +
        '    </div>\n' +
        '    <div class="iframe-wrap">\n' +
        '<a id="embed_open_full_screen" class="embed-nav-right" href="https://chat.inet.vn" target="_blank"><i class="fa fa-external-link-square"></i></a>' +
        '<a href="javascript:void(0)" class="embed-nav-right" id="embed_close"><i class="fa fa-close"></i></a>' +
        '       <iframe id="embed_iframe" src="https://chat.inet.vn/messenger/embed/customercare@inet.vn?embed&source='+encodeURI(window.location.href)+'" frameborder="0"\n'+
        '                scrolling="no"></iframe>\n' +
        '    </div>\n' +
        '</div>';
    const container = document.createElement("div");
    container.id = 'i-embed-chat-wrap';
    document.body.appendChild(container);
    //cài đặt hiển thị chat với các tham số top right bottom left center ví dụ: bottom right như defaultEmbedChat bên dưới
    let defaultEmbedChat = 'bottom right';
    document.getElementById('i-embed-chat-wrap').className = 'embed-fixed ' + defaultEmbedChat;
    document.getElementById('i-embed-chat-wrap').innerHTML = e;

    let show = false;
    const embedChat = document.getElementById("embed_chat_avatar");
    const embedContainer = document.getElementById("embed_container");
    const embedClose = document.getElementById("embed_close");
    const frame = document.getElementById("embed_iframe");
    const counter = document.getElementById("counter");
    frame.contentWindow.postMessage("sayHello", "*");
    frame.style.cssText = "width: 400px; height: 450px;";
    embedChat.onclick = function () {
        embedContainer.style.display = "block";
        show = true;
        count = 0;
        embedChat.style.display = "none";
		document.getElementById('i-embed-chat-wrap').setAttribute("stopAnimate", "true");
    };
    //setdefault value
    let count = 0;
    counter.style.display = "none";
    embedClose.addEventListener('click', function () {
        embedContainer.style.display = "none";
        embedChat.style.display = "block";
        show = false;
        counter.style.display = "none";
        counter.innerText = "";
		document.getElementById('i-embed-chat-wrap').removeAttribute("stopAnimate");
    });
    let gunPost = null;
    window.onload = function () {
        const iframeWin = frame.contentWindow;
        gunPost = setInterval(function () {
            iframeWin.postMessage("myMessage.value", "*");
            console.log('wait for ...')
        },50);
    };

    function displayMessage (evt) {
        //document.getElementById("count-unread-message").innerText = (++count);
        if(evt.data === 'new_message'&&!show){
            counter.style.display = "flex";
            //update new message count
            console.log('ban co ',++count,'tin nhan');
            counter.innerText = count;
        }
        if(gunPost !== null){
            clearInterval(gunPost);
            gunPost = null;
        }
    }
    counter.innerText = count;

    if (window.addEventListener) {
        window.addEventListener("message", displayMessage, false);
    }
    else {
        window.attachEvent("onmessage", displayMessage);
    }
}());