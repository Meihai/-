<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
<head>
    <base href="<%=basePath%>">
    <title>My WebSocket</title>
</head>

<body>
Welcome<br/>
<input id="text" type="text" />
<button onclick="openSocket()">open</button>
<button onclick="send()">Send</button>
<button onclick="closeWebSocket()">Close</button>
<div id="message">
</div>
</body>

<script type="text/javascript">
    var websocket = null;

    //连接发生错误的回调方法
    websocket.onerror = function(){
        setMessageInnerHTML("error");
    };

    //连接成功建立的回调方法
    websocket.onopen = function(event){
        setMessageInnerHTML("open");
    }

    //接收到消息的回调方法
    websocket.onmessage = function(){
        setMessageInnerHTML(event.data);
    }

    //连接关闭的回调方法
    websocket.onclose = function(){
        setMessageInnerHTML("close");
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function(){
        if (websocket.isOpen() == true){
            websocket.close();
        }
    }

    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML){
        document.getElementById('message').innerHTML += innerHTML + '<br/>';
    }

    //关闭连接
    function closeWebSocket(){
        websocket.close();
    }

    //发送消息
    function send(){
        var message = document.getElementById('text').value;
        websocket.send(message);
    }

    //发送消息
    function openSocket(){

        //判断当前浏览器是否支持WebSocket
        if('WebSocket' in window){
            if (websocket != null){
                alert('websocket has connected')
            }else {
                websocket = new WebSocket("ws://192.168.0.167:8080/monitor_main?data_type=alert");
            }
        }
        else{
            alert('no websocket')
        }

//        for (var i=0; i<500; i++)
//        {
//            websocket = new WebSocket("ws://localhost:8080/monitor_main");
//        }
    }
</script>
</html>
