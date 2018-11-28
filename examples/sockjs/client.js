const SockJS = require('sockjs-client');
const Stomp = require('stompjs');

const socket = new SockJS('http://localhost:3002/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({/*headers*/ },
    function onConnect(data) {
        console.log('STOMP is now connected!');

        // subscription
        stompClient.subscribe('/echo', (data) => {
          console.log("je suis dans echo", data);
        });

        // trigger some data
        let timer = 0;
        setInterval(() => {
            stompClient.send('/echo', {}, String(++timer));
        }, 6000);
    },
    (error) => console.error(error));
