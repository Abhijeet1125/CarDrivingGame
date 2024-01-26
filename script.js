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
    },
    {
        'x' : 125,
        'y' :  30, 
        'w' : 60, 
        'h' : 147,
        'wid' : wi/ 10 ,
        'hei' : wi / 4.6 ,
        'xx'  : wi / 2,
        'yy' :  hi - wi /4- 10 ,
        'race': 0.5 ,
    },
    {        
        'x' : 125,
        'y' :  226, 
        'w' : 60, 
        'h' : 138,
        'wid' : wi/ 10 ,
        'hei' : wi / 5 ,
        'xx'  : wi / 4 * 3,
        'yy' :  20 ,
        'race': 0.5 ,
    },
    {        
        'x' : 15,
        'y' :  407, 
        'w' : 60, 
        'h' : 147,
        'wid' : wi/ 10 ,
        'hei' : wi / 5 ,
        'xx'  : wi / 8 ,
        'yy' :  hi / 3 ,
        'race': 0.5 ,
    },
    {       
        'x' : 243,
        'y' :  407, 
        'w' : 58, 
        'h' : 147,
        'wid' : wi/ 10 ,
        'hei' : wi / 5 ,
        'xx'  : wi / 2,
        'yy' :  -hi / 2  ,
        'race': 0.5 ,
    },
    {        
        'x' : 362,
        'y' :  407, 
        'w' : 58, 
        'h' : 147,
        'wid' : wi/ 10 ,
        'hei' : wi / 4.4 ,
        'xx'  : wi / 1.3,
        'yy' :  hi * 1.5 ,
        'race': 0.5 ,
    },
    {        
        'x' : 126,
        'y' :  407, 
        'w' : 60, 
        'h' : 147,
        'wid' : wi/ 10 ,
        'hei' : wi / 5 ,
        'xx'  : wi / 3,
        'yy' :  -hi + 10  ,
        'race': 0.5 ,
    },
    
]


let im = new Image ();
im.src = "images/cars.png"


let  GF = 0 ; 
let inc = [ 1 , 1 , 1 , 1, 1 ];

function animate() {
    GF ++ ; 
    if (x > imglen) { x -= imglen; }
    canvas.clearRect(0, 0, wi, hi);
    canvas.drawImage(back, 0, 0, 1080, 1916, 0, x, wi, imglen);
    canvas.drawImage(back, 0, 0, 1080, 1916, 0, x - imglen, wi, imglen + 2);
    canvas.drawImage ( im , 15, 22, 60, 155, ordi[0].xx , ordi[0].yy,ordi[0].wid,ordi[0].hei )
    for ( let  i =  1  ; i <= 6 ; i ++ ){
        canvas.drawImage ( im , ordi[i].x , ordi[i].y,ordi[i].w,ordi[i].h, ordi[i].xx , ordi[i].yy,ordi[i].wid,ordi[i].hei )
        ordi[i].yy -= ( ordi[i].race - speed) 
        if ( ordi[i].yy < -1 * hi){
            ordi[i].yy = hi * 1.8 ;
        }
        else if ( ordi[i].yy > hi * 1.8 ){
            ordi [i].yy = -1 * hi  ;
        }        
    }

    if ( GF %  5 == 0  ){
        let toch = Math.floor ( Math.random () * 7 );
        if ( ordi[toch].race < toch + 4   ){
            inc[toch] = 1 ; 
        }
        else if ( ordi[toch].race > 15 - toch ){ inc[toch] = 0 ; }
        if ( inc[toch] == 1 ){
            ordi[toch].race += Math.random () * 0.1 ;
        }
        else {
            ordi[toch].race -= Math.random () * 0.1 ;
        }
    }

    x += speed;
    requestAnimationFrame(animate);
}
animate();


document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowUp') {
        speed += (1 / (speed * 2 + 10));
        if (speed > 16) { speed = 15; }
    } else if (event.code === 'ArrowDown') {
        speed -= 0.01 * speed + 0.1;
        if (speed <= 0) {
            speed = 0;
        }
    }
    if (event.code === 'ArrowLeft') {
        ordi[0].xx -= 4 ; 
        if ( ordi[0].xx  < wi / 9){
            ordi [0].xx = wi / 9 ;
        } 
    } else if (event.code === 'ArrowRight') {
        ordi [0].xx += 4  ;
        if ( ordi[0].xx  > 71 *wi / 90 ){
            ordi [0].xx = 71 *wi / 90;
        } 
    }
});

