let exit = document.getElementById("exit");
exit.addEventListener ( "click" , ( e ) => {
    window.open('about:blank' , '_self');
});


let play = document.getElementById("play");
play.addEventListener ( "click" , ( e ) => {        
    window.open('game.html' , '_self');
});

// Set a local storage item
localStorage.setItem('variableName', 'variableValue');

// Access the local storage item
var localhighscore  = Math.floor(localStorage.getItem('HighScore'));
var localnewscore  =  Math.floor(localStorage.getItem('newScore'));
var localmax  =  Math.floor(localStorage.getItem('maxSpeed'));

if ( localnewscore > localhighscore ){
    localStorage.setItem('HighScore', localnewscore);
    document.getElementById("cong").innerHTML = `<h1>CONGRATULATION!!</h1> <h3>NEW HIGH SCORE.. </h3>Score : ${localnewscore} <br>Max Speed : ${localmax}`;
}
else { 
    document.getElementById("cong").innerHTML = `<h1>Good job!</h1>Score : ${localnewscore} <br>Max Speed : ${localmax}`;
}





