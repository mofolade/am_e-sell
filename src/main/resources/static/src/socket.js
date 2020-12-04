// Vue will allow us to import the store to 
// any .js-file
import {store} from './store.js'

let ws;
//let wsBid;
let isConnected = false;
//let isConnectBid = false;
connect();
//connectbid();

function connect() {
    // change PORT to your backends PORT
    ws = new WebSocket('ws://localhost:4000/your-socket-route');
    console.log('connect resz')
    // from the backend
    ws.onmessage = (e) => {
        console.log('onmessage')
        let dataWrapper;
        try {
            dataWrapper = JSON.parse(e.data)
        } catch {
            console.warn('Could not parse:', e.data);
            return
        }

        switch(dataWrapper.action) {
            case 'bid':
                console.log('New bid:', dataWrapper.payload);
                store.commit('prependBid', dataWrapper.payload)
            break;
            case 'message':
                console.log('New message:', dataWrapper.payload);
                store.commit('prependMessage', dataWrapper.payload)
            break;
            case 'user-status':
                console.log('New status change:', dataWrapper.payload);
            break;
            default:
                console.log('Could not read action:', dataWrapper.action);
        }
    }

    ws.onopen = (e) => {
        send({
            action: 'connection',
            payload: 'user connected'
        });
        isConnected = true;
    };

    ws.onclose = (e) => {
        console.log("Closing websocket...");
    };

    console.log("Connecting...");

}
function disconnect() {
    if (ws != null) {
        ws.close();
    }
    isConnected = false;
    console.log("Disconnected");
}

function send(data) {
    ws.send(JSON.stringify(data));
}

function sendMessage(message,action) {
    send({
        action: action,
        payload: message
    })
}

export {
    send,
    sendMessage
}