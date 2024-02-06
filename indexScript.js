localStorage.setItem('HighScore', 0 );
localStorage.setItem('NewScore', 0);

let exit = document.getElementById("exit");
exit.addEventListener("click", (e) => {
  window.open('about:blank', '_self');
});


let play = document.getElementById("play");
play.addEventListener("click", (e) => {
  window.open('game.html', '_self');
});
