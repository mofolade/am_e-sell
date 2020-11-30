// Vue will allow us to import the store to 
// any .js-file
import {store} from './store.js'

let ws;
let wsBid;
let isConnected = false;
let isConnectBid = false;
connect();
connectbid();

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

                // this will trigger a re-render of all components using the messages
                store.commit('prependBid', dataWrapper.payload)
            break;
            case 'message':
                console.log('New message:', dataWrapper.payload);

                // this will trigger a re-render of all components using the messages
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

function connectbid() {
    // change PORT to your backends PORT
    wsBid = new WebSocket('ws://localhost:4000/bids');
    
    // onmessege listens to incoming websocket messages
    // from the backend
    wsBid.onmessage = (e) => {
        console.log('onmessage bid')
        let dataWrapper;
        try {
            dataWrapper = JSON.parse(e.data)
        } catch {
            console.warn('Could not parse:', e.data);
            return
        }
    
        switch(dataWrapper.action) {
            case 'message':
                console.log('New message:', dataWrapper.payload);

                // this will trigger a re-render of all components using the messages
                store.commit('prependBid', dataWrapper.payload)
            break;
            case 'user-status':
                console.log('New status change:', dataWrapper.payload);
            break;
            default:
                console.log('Could not read action:', dataWrapper.action);
        }
    }

    wsBid.onopen = (e) => {
        console.log('es ez mikor van???')
        sendf({
            action: 'connection',
            payload: 'user connected'
        });
        isConnectBid = true;
    };

    wsBid.onclose = (e) => {
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
    
    console.log('send resz')
    ws.send(JSON.stringify(data));
}

function sendMessage(message) {
    
    console.log('sendMessage resz')
    send({
        action: 'message',
        payload: message
    })
}

function sendf(data) {
    //#2
    console.log('send resz bid')
    wsBid.send(JSON.stringify(data));
}

function sendMessageBid(message) {
    //#1
    console.log('sendMessage resz bid')
    sendf({
        action: 'bid',
        payload: message
    })
}

function disconnectf() {
    if (wsBid != null) {
        wsBid.close();
    }
    isConnectBid = false;
    console.log("Disconnected bid");
}

export {
    send,
    sendf,
    sendMessageBid,
    sendMessage
}