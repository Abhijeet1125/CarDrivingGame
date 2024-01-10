"use strict"
let hi = document.getElementById("playground").clientHeight
let wi = document.body.clientWidth
wi = Math.min(wi, hi);
document.getElementById("playground").style.width = `${wi}px`


const can = document.getElementById("can")
can.height = hi
can.width = wi
can.style.width = `${wi}px`
can.style.height = `${hi}px`


const canvas = can.getContext('2d')
const back = new Image()
back.src = "images/road.png"

let x = 0 ; 
let imglen = Math.floor((wi /1080 )* 1916)



function animate() {
    if ( x >= imglen){ x = 0 ; }
    canvas.clearRect(0, 0, wi, hi);
    canvas.drawImage(back, 0 , 0 , 1080 , 1916 , 0, x , wi, imglen);
    canvas.drawImage(back, 0 , 0 , 1080 , 1916 , 0, x-imglen , wi, imglen);
    x = x + 1 ; 
    requestAnimationFrame(animate);
}
animate();




