$(document).ready(function() {
  init();
  // $("#num-players-select").on('change', drawPlayerSelection);

});


var game = {
  players : []

}

class Player {
  constructor(name, number) {
    this.name = name;
    this.number = number;
    this.letters = [];
    this.score = 0;
  }

  addLetters(letters) {
    this.letters = this.letters.concat(letters)
  }

  getLetters() {
    return this.letters
  }

  drawTurn() {
    var string = '<div class="player-letters">';
    string +=   '<span>';
    string +=     '<svg width="10" height="10" class="player-color">';
    string +=       '<rect width="10" height="10"';
    string +=       'style="fill:' + gameConst.playerColor[this.number] + ";";
    string +=       'stroke-width:1;stroke:rgb(0,0,0)"/>';
    string +=     '</svg>' + this.name;
    string +=   '</span>';
    for(var i in this.letters) {
       string += '<div class="letter">' + this.letters[i] + "</div>"
    }
    string += "<button id='submitTurn'> Submit </button>"
    string += "</div>"

    $("body").append(string);
  }
}

function init() {
  drawBoard();
  initGame();
}

function initGame() {
  // Make Players
  game.players[0] = new Player('Sijia', 0)
  game.players[1] = new Player('Computer', 1)

  for(var i in game.players) {
    game.players[i].addLetters(['A','L','F','S','E','A','D']);
  }

  game.players[0].drawTurn();

  // Handle
}


function drawBoard() {
  var string = '<table class="board">';
  for(var i = 0; i < gameConst.boardSize ; i++) {
    string += '<tr id="row' + i + '">'
    for(var j = 0; j < gameConst.boardSize ; j++) {
      string += '<td id="cell' + i + '-' + j + '"> <div class="cell"></div>  </td>'
    }
    string += '</tr>'
  }
  string += '</table>'
  $("body").append(string);
}


// var string = "";
// for(var i = 0; i < 26; i++) {
//   string += String.fromCharCode(i + 65) + "<br>"
// }




// $(document).ready(function() {
//   $("body").append(string);
// });
