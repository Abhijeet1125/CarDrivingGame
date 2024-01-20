"use strict"
let hi = document.getElementById("playground").clientHeight - 4;
let wi = document.body.clientWidth
wi = Math.min(wi, hi/1.1);
document.getElementById("playground").style.width = `${wi}px`


const can = document.getElementById("can")
can.height = hi
can.width = wi
can.style.width = `${wi}px`
can.style.height = `${hi}px`


const canvas = can.getContext('2d')
const back = new Image()
back.src = "images/road.png"

let imglen = Math.floor((wi / 1080) * 1916)
let x =  imglen - 5 ;

let speed = 0;



let ordi = [
    {
        'wid' : wi/ 10 ,
        'hei' : wi / 5 ,
        'xx'  : wi / 3,
        'yy' :  hi - wi /4- 10 ,
    }
]


let im = new Image ();
im.src = "images/cars.png"




function animate() {
    if (x > imglen) { x -= imglen; }
    canvas.clearRect(0, 0, wi, hi);
    canvas.drawImage(back, 0, 0, 1080, 1916, 0, x, wi, imglen);
    canvas.drawImage(back, 0, 0, 1080, 1916, 0, x - imglen, wi, imglen + 2);
    canvas.drawImage ( im , 15, 22, 60, 155, ordi[0].xx , ordi[0].yy,ordi[0].wid,ordi[0].hei )
    x += speed;
    requestAnimationFrame(animate);
}
animate();


document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowUp') {
        speed += (1 / (speed * 2 + 10));
        if (speed > 15) { speed = 15; }
    } else if (event.code === 'ArrowDown') {
        speed -= 0.01 * speed + 0.1;
        if (speed <= 0) {
            speed = 0;
        }
    }
    if (event.code === 'ArrowLeft') {
        ordi[0].xx -= 2 ; 
        if ( ordi[0].xx  < wi / 9){
            ordi [0].xx = wi / 9 ;
        } 
    } else if (event.code === 'ArrowRight') {
        ordi [0].xx += 2  ;
        if ( ordi[0].xx  > 71 *wi / 90 ){
            ordi [0].xx = 71 *wi / 90;
        } 
    }
});

