"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/cathub").build();
var objImage= null;

connection.start().then(function () {
    objImage=document.getElementById("catImage");				
    objImage.style.position='relative';
    objImage.style.left='0px';
    objImage.style.top='0px';
}).catch(function (err) {
    return console.error(err.toString());
});

document.addEventListener('keydown', function (e) {
    switch(e.keyCode || e.which){
        case 37:
            moveLeft();
            break;
        case 38:
            moveUp();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            moveDown();
            break;						
    }    
    var x = parseInt(objImage.style.left) + 'px';
    var y = parseInt(objImage.style.top) + 'px';
    connection.invoke("MoveCat", x, y).catch(function (err) {
        return console.error(err.toString());
    });    
});

connection.on("ReceiveCoordinate", function (x, y) {
    objImage=document.getElementById("catImage");				
    objImage.style.position='relative';
    objImage.style.left=x;
    objImage.style.top=y;
});

function moveLeft(){
    if (parseInt(objImage.style.left) >= 0){
        objImage.style.left=parseInt(objImage.style.left)-5 +'px';        
    }    
}
function moveUp(){
    if (parseInt(objImage.style.top) >= 0){
        objImage.style.top=parseInt(objImage.style.top)-5 +'px';   
    }    
}
function moveRight(){
    if (parseInt(objImage.style.left) <= 1080){
        objImage.style.left=parseInt(objImage.style.left)+5 +'px';   
    }    
}
function moveDown(){
    if (parseInt(objImage.style.top) <= 480){
        objImage.style.top=parseInt(objImage.style.top)+5 +'px';
    }
}