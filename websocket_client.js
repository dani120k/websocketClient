var output;

var websocket;

function WebSocketSupport()
{
    if (browserSupportsWebSockets() === false) {
        document.getElementById("ws_support").innerHTML = "<h2>Sorry! Your web browser does not supports web sockets</h2>";

        var element = document.getElementById("wrapper");
        element.parentNode.removeChild(element);

        return;
    }

    output = document.getElementById("chatbox");

    websocket = new WebSocket('ws:localhost:8080/test');

    websocket.binaryType = "blob";

    websocket.onopen = function(e) {
        //writeToScreen("You have have successfully connected to the server");
    };


    websocket.onmessage = function(e) {
        onMessage(e)
    };

    websocket.onerror = function(e) {
        onError(e)
    };
}

function onMessage(e) {
    console.log(e.data);
    for(var i = 0; i<1000000000;)
        i--;

    //writeToScreen('<span style="color: blue;"> ' + e.data + '</span>');
}

function onError(e) {
    //writeToScreen('<span style="color: red;">ERROR:</span> ' + e.data);
}

function doSend(message) {
    alert(message)

    var ch, st, re = [];
    for (var i = 0; i < message.length; i++ ) {
        ch = message.charCodeAt(i);  // get char
        st = [];                 // set up "stack"
        do {
            st.push( ch & 0xFF );  // push byte to stack
            ch = ch >> 8;          // shift value down by 1 byte
        }
        while ( ch );
        // add stack contents to result
        // done because chars have "wrong" endianness
        re = re.concat( st.reverse() );
    }


    websocket.send(re);

}

function writeToScreen(message) {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}

function userInputSupplied() {
    var msg = document.getElementById('file').value;
    if (msg === '') {
        return 'Please the message to send';
    } else {
        return '';
    }
}

function browserSupportsWebSockets() {
    if ("WebSocket" in window)
    {
        return true;
    }
    else
    {
        return false;
    }
}