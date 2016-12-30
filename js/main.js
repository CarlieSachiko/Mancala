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
var player, p1Pits, p2Pits, p1Store, p2Store;
var p1Color = 'blue';
var p2Color = 'red';
var $player = $('span#player');
var $new_game = $('div#new-game');
var $cell = $('td.cell');
var $p1_store = $('td#player-one');
var $p2_store = $('td#player-two');

/*--- EVENT LISTENERS ---*/
$new_game.on('click', init);
$cell.on('click', handleClick);

/*--- OBJECTS ---*/
var Mancala = function () {
  this.current_pits = [4,4,4,4,4,4];
  this.other_pits = [4,4,4,4,4,4];
  this.current_store = 0;
  this.other_store = 0;
};

/*--- FUNCTIONS ---*/

Mancala.prototype.get_stones = function (pit){
  if
}






