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
var board, player, anotherTurn, gameOver;
var p1Color = 'blue';
var p2Color = 'red';
var $player = $('span#player');
var $new_game = $('div#new-game');
var $bowl = $('td.bowl');
var $p1_store = $('td#player-one');
var $p2_store = $('td#player-two');
var $win_msg = $('div#win-msg');
var p1SkipStore = [13].reduce(function (res, key) {
  res[key] = true;
  return res;
  },
{});
var p2SkipStore = [6].reduce(function (res, key) {
  res[key] = true;
  return res;
  },
{});

/*--- EVENT LISTENERS ---*/
$new_game.on('click', init);
$bowl.on('click', handleClick);

/*--- FUNCTIONS ---*/
function init(){
  player = 1;
  board = [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
  setPlayerMsg();
  updateDisplay();
}

init();

function updateDisplay(){
  for(var i = 0; i<board.length; i++){
      var $bowlIdx = $('#' + i);
      $bowlIdx.html(board[i]);
  }
  $p1_store.html(board[6]);
  $p2_store.html(board[13]);
}

function setPlayerMsg(){
  if (player === 1){
    $player.html('player one').css('color', p1Color);
  } else {
    $player.html('player two').css('color', p2Color);
  }
}

function switchPlayer(){
  if (anotherTurn === true) return;
  else {
    player = (player === 1) ? 2 : 1;
    setPlayerMsg();
  }
}

function moveStones(skip, value, idx){
  board[idx] = 0;
  var newVal = value + idx + 1;
  for(var i = (idx+1); i < newVal; i++){
    if(i <= 13){
      if (skip[i]) {
          i-=1;
          continue;
          return i;
        };
      board[i] += 1;
      repeatTurn(i, newVal);
      captureStones(i, newVal);
    } else if (i > 13){
      for(var j = 0; j < (newVal - 14); j++){
        if (skip[j]) {
          j-=1;
          continue;
          return j;
        };
        board[j] += 1;
        repeatTurn(j, newVal);
        captureStones(j, newVal);
      }
    return;
    }
  }
}

function repeatTurn(x, newVal){
  if (player === 1 && x === newVal-1 && x === 6){
    console.log("p1 again");
    anotherTurn = true;
  } else if (player === 2 && x === newVal-1 && x === 13){
    anotherTurn = true;
  } else {
    anotherTurn = false;
  }
}

function captureStones(x, newVal){
  if (x === newVal-1 && board[x] === 1 && x !== 6 && x !== 13){
    console.log('capture!');
    if (player === 1 && p1Side(x)){
      switch(x){
        case 0:
          addStonesP1 (6, 0, 12);
          break;
        case 1:
          addStonesP1 (6, 1, 10);
          break;
        case 2:
          addStonesP1 (6, 2, 8);
          break;
        case 3:
          addStonesP1 (6, 3, 6);
          break;
        case 4:
          addStonesP1 (6, 4, 4);
          break;
        case 5:
          addStonesP1 (6, 5, 2);
          break;
      }
    } else if (player === 2 && p2Side){
      switch(x){
        case 12:
          addStonesP2 (13, 12, 12);
          break;
        case 11:
          addStonesP2 (13, 11, 10);
          break;
        case 10:
          addStonesP2 (13, 10, 8);
          break;
        case 9:
          addStonesP2 (13, 9, 6);
          break;
        case 8:
          addStonesP2 (13, 8, 4);
          break;
        case 7:
          addStonesP2 (13, 7, 2);
          break;
      }
    }
  }
}

function p1Side(x){
  if (x === 0 || x === 1 || x === 2 || x === 3 || x === 4 || x === 5){
    return true
  } else {
    return false;
  }
}

function p2Side(x){
  if (x === 7 || x === 8 || x === 9 || x === 10 || x === 11 || x === 12){
    return true
  } else {
    return false;
  }
}

function addStonesP1 (store, x, inverse){
  board[store] += board[x + inverse] + 1;
  board[x] = 0;
  board[x + inverse] = 0;
}

function addStonesP2 (store, x, inverse){
  board[store] += board[x - inverse] + 1;
  board[x] = 0;
  board[x - inverse] = 0;
}

// function checkWinner(){
//   if(emptySide){
//     if(board[6] > board[13]){
//       $win_msg.html('Player One wins!');
//     } else {
//       $win_msg.html('Player Two wins!');
//     }
//   }
// }

// function emptySide(){
//   for (var i = 0; i <= 5; i++){
//     if (board[i] === 0){
//       return true
//     } else return false;
//   }
//   for (var i = 7; i <= 12; i++){
//     if (board[i] === 0){
//       return true
//     } else return false;
//   }
// }

function handleClick(evt){
  var value = parseInt($(this).text());
  var idx = parseInt($(this).attr('id'));
  if (player === 1 && p1Side(idx)){
    moveStones(p1SkipStore, value, idx);
    updateDisplay();
    switchPlayer();
  } else if (player === 2 && p2Side(idx)){
    moveStones(p2SkipStore, value, idx);
    updateDisplay();
    switchPlayer();
  }
  // checkWinner();
      // if (!repeatTurn){
    //   switchPlayer();
    // }
}




