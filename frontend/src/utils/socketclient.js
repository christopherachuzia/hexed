import io from 'socket.io-client'

export const socket = io('http://localhost:5050',{
    transports: ['websocket'],
    upgrade: false
})
// export function initializeSocket(IPAddress,PORT){
//     if(!socket){
//         const url = `http://${IPAddress}/`
//         // socket = io(url,{
//         //     transports: ['websocket']
//         // })
//         socket = io
//     }
// }

// export function getSocket(){
//     return socket
// }

// export function disconnect(){
//     socket = undefined;
// }

// export function on(event){
//     socket.on(event.type, event.callback)
// }