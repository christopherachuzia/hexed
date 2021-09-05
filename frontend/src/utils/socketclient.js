import io from 'socket.io-client'

let socket = undefined;

export function initializeSocket(IPAddress){
    if(!socket){
        const url = `http://${IPAddress}`
        socket = io(url,{
            transports: ['websocket']
        })
    }
}

export function getSocket(){
    return socket
}

export function disconnect(){
    socket = undefined;
}

export function on(event){
    socket.on(event.type, event.callback)
}