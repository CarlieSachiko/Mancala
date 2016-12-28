/*
/////PSUEDOCODE/////
1. Initialize
  -set palyer
  -set board array
  -set player message
  -reset win/play again message
2. Handle click (only click on side corresponding with player)
  -take value of clicked cell and add one to each cell following
  -only drop one into a store if it is the corresponding player's turn
  -continue to drop until it finishes on empty cell
    -if that empty cell is on your side, player gets to capture that #
    and the # opposite it on the other player's side
  -if finish on store, that player gets to go again
3. Once all cells are 0, check for winner
/*

/*--- VARIABLES ---*/
var board, player;
var p1Color = 'blue';
var p2Color = 'red';
var $player = $('span#player');
var $new_game = $('div#new-game');



/*--- EVENT LISTENERS ---*/
$new_game.on('click', init);






/*--- FUNCTIONS ---*/
function init(){
  player = 1;
  setPlayerMsg();
}

init();

function setPlayerMsg(){
  if (player === 1){
    $player.html('player one').css('color', p1Color);
  } else {
    $player.html('player two').css('color', p2Color);
  }
}
