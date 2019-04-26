<html>
<head>

<script type="text/javascript">
// Let us open a web socket
var ws = null;
function WebSocketTest()
{
    if ("WebSocket" in window)
    {
        alert("WebSocket is supported by your Browser!");

        // Let us open a web socket
        ws = new WebSocket("wss://localhost:4466/websocket");
        ws.onopen = function()
        {
            // Web Socket is connected, send data using send()
            ws.send("Message to send");
            alert("Message is sent...");
        };

        ws.onmessage = function (evt)
        {
            var received_msg = evt.data;
            alert(received_msg);
            //alert("Message is received...");
        };

        ws.onclose = function()
        {
            // websocket is closed.
            alert("Connection is closed...");
        };

        window.onbeforeunload = function(event) {
            socket.close();
        };
    }

    else
    {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
    }
}
</script>

</head>
<body>

<div id="sse">
    <a href="javascript:WebSocketTest()">Run WebSocket</a>
</div>
</body>
</html>