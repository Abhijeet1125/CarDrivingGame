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
let totalScore = 0 ; 
let fuel = 3000; 
let target = -2*hi  ; 
let round = 0 ; 


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
        'race': 1 ,
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
        'race': 1.5 ,
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
        'race': 0.2 ,
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
        'race': 2.5 ,
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
        'race': 0.8 ,
    },
    
]


let im = new Image ();
im.src = "images/cars.png"

// game frame and array to store car speed should inc or dec 
let  GF = 0 ; 
let inc = [ 1 , 1 , 1 , 1, 1 ];

let lane_change  = Math.floor( Math.random() * 5 + 1)  ;
let left = 1 ; 
let leftlimit = wi / 9 ;
let rightlimit = 71 *wi / 90;

function checkCollide ( ia ,  ib ){
    if (  ordi[ia].xx - ordi[ib].xx  > ordi[ib].wid ||
        ordi[ib].xx - ordi[ia].xx  > ordi[ia].wid ||
        ordi[ia].yy - ordi[ib].yy  > ordi[ia].hei  ||
        ordi[ib].yy - ordi[ia].yy  > ordi[ib].hei 
        ){
            return 0 ; 
        }
    return 1 ; 
}

const fillscore = document.querySelector('.fillscore');
const fillspeed = document.querySelector('.fillspeed');
const fillfuel = document.querySelector('.fillfuel');

let stopp = 0 ; 

function animate() {
    GF ++ ; 
    fuel -=1 ; 
    if ( fuel <=  0 ){ stopp = 1 ; }
    target += speed;
    if ( target >= hi ){      
        target = -2*hi * ( round) -10 * hi;        
        fuel = 3000
        round ++ ; 
    }
    if (x > imglen) { x -= imglen; }
    canvas.clearRect(0, 0, wi, hi);
    canvas.drawImage(back, 0, 0, 1080, 1916, 0, x, wi, imglen);
    canvas.drawImage(back, 0, 0, 1080, 1916, 0, x - imglen, wi, imglen + 2);
    canvas.fillStyle = "green";
    canvas.fillRect (leftlimit , target , rightlimit  , 15 );
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

    // collision between other cars 
    for ( let i = 1 ; i <= 6 ; i ++ ){
        for ( let j  = i + 1 ; j <= 6 ; j ++ ){
            if ( checkCollide ( i , j ) ){
                let  tem = ordi[i].race + ordi[j].race  ;               
                if ( ordi[i].yy > ordi[j].yy){                
                    ordi[i].race = tem * 0.4   ; 
                    ordi[j].race = tem  * 0.6  ; 
                }
                else { 
                    ordi[i].race = tem * 0.6   ; 
                    ordi[j].race = tem  * 0.4 ; 
                }
            }
        }
    }


    // collision between driving and other cars 
    for ( let i = 1 ; i <=  6 ; i ++){
        if ( checkCollide( i ,  0)){
            if ( ordi[i].yy - ordi[0].yy > 0.9 * ordi[0].hei  ){
                ordi[i].race = 0.7* speed ;
            }
            else { 
                stopp = 1  ; 
            }
        }
    }

    // changing the speed of cars 
    if ( GF %  5 == 0  ){
        let toch = Math.floor ( Math.random () * 6 +1 );
        if ( ordi[toch].race < toch + 1   ){
            inc[toch] = 1 ; 
        }
        else if ( ordi[toch].race > 8  ){ inc[toch] = 0 ; }
        if ( inc[toch] == 1 ){
            ordi[toch].race += Math.random () * 0.1 ;
        }
        else {
            ordi[toch].race -= Math.random () * 0.1 ;
        }
    }

    // changing the lane of the cars 

    if ( GF % 200 == 0 ){
        for ( let  i = 1 ; i <= 6 ; i ++ ){
            if ( ordi[i].race < 5 ){
                lane_change = i ; 
                break ; 
            }
        }
        lane_change = Math.floor(Math.random() * 6 + 1 );
        lane_change = Math.min ( 6 , lane_change);
    }
    if ( GF % 3 == 0 && GF%200 <120 ){
        let le  ; 
        le = ordi[lane_change].xx ;
        if ( left ){
            ordi[lane_change].xx -= 2 ;  
        }
        else { 
            ordi [lane_change].xx += 2  ; 
        }
        let  tr = 0  ;
        for ( let i = 0 ; i <=  6 ; i ++){
            if ( i == lane_change ){ continue;}
            if ( checkCollide( i ,  lane_change ) ){
                tr = 1 ; 
                break ; 
            }
        }
        if ( ordi[lane_change].xx  < leftlimit ){
            left = 0 ; 
        }
        else if ( ordi[lane_change].xx  > rightlimit){
            left = 1 ; 
        }
        if ( tr ){
            ordi[lane_change].xx = le ;
        }
    }
    // updating speed and score 
    totalScore += speed /100 ; 
    fillscore.innerHTML = Math.floor( totalScore);
    fillspeed.innerHTML =  Math.floor(speed * 12) ; 
    fillfuel.innerHTML = `${Math.floor ( fuel / 30 )} %` ;
    x += speed;
    if ( stopp == 0 ) {requestAnimationFrame(animate);}
}
animate();


document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowUp') {
        speed += (1 / (speed * 2 + 10));
        if (speed > 16) { speed = 15; }
    } else if (event.code === 'ArrowDown') {
        speed -= 0.01 * speed + 0.2;
        if (speed <= 0) {
            speed = 0;
        }
    }
    if (event.code === 'ArrowLeft') {
        ordi[0].xx -= 6 ; 
        if ( ordi[0].xx  < wi / 9){
            ordi [0].xx = wi / 9 ;
        } 
    } else if (event.code === 'ArrowRight') {
        ordi [0].xx += 6  ;
        if ( ordi[0].xx  > 71 *wi / 90 ){
            ordi [0].xx = 71 *wi / 90;
        } 
    }
});

