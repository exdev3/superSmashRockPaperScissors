//import { getHeapStatistics } from "v8";

var socket = io();
var socketNumber = 0;
socket.on('newUser', function(data) {
    console.log("newUser");
    console.log(data);
    addUser(data.number);
});
socket.on('socketNumber', function(data) {
    console.log("socketNumber");
    console.log(data);
    socketNumber = data.number;
    startGame();
});
socket.on('socketDisconnected', function(data) {
    console.log("socketDisconnected");
    console.log(data);
    removeUser(data.number);
});
socket.on('socketUpdate', function(data) {
    if(data.number != socketNumber){
        myGamePieces[data.number].x = data.position.x;
        myGamePieces[data.number].y = data.position.y;
    }
});
socket.on('socketActionUpdate', function(data) {
    if(data.number != socketNumber){
        myGamePieces[data.number].action = data.action;
        myGamePieces[data.number].actionDirection = data.direction;
    }
});
socket.on('hit', function(data) {
    if(data.number == socketNumber){
        getHit(data.action,data.direction);
    }
});
function sendSocketData() {
    socket.emit('socketUpdate', {number : socketNumber, position : {x:myGamePieces[socketNumber].x,y:myGamePieces[socketNumber].y} });
};
function sendActionSocketData() {
    socket.emit('socketActionUpdate', {number : socketNumber, action : myGamePieces[socketNumber].action, direction : myGamePieces[socketNumber].actionDirection });
};

function hit(i,action,dir){
    socket.emit('hit', {number : i, action : action, direction : dir });
}