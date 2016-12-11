$(document).ready(function() {
  init();

  $('#submit-turn').click(onSubmit);
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
    string +=   '<div>';
    string +=     '<svg width="10" height="10" class="player-color">';
    string +=       '<rect width="10" height="10"';
    string +=       'style="fill:' + gameConst.playerColor[this.number] + ";";
    string +=       'stroke-width:1;stroke:rgb(0,0,0)"/>';
    string +=     '</svg>' + this.name;
    string +=   '</div>';
    for(var i in this.letters) {
         string += '<div class="letter draggable">' + this.letters[i] + "</div>"
    }
    string += "<button id='submit-turn'> Submit </button>"
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

  $(function() {
    $(".letter").draggable({
      stop: dragend
    });
  });

  // $(".letter").on("dragstop", drag
  // Handle
}

function dragend() {
  debugger;
}

function onSubmit(e) {

  // debugger;

}

function drawBoard() {
  var string = '<table class="board">';
  string += '<th id="row0">'
  // string += '<td></td>'
  for(var j = 0; j < gameConst.boardSize ; j++) {
    string += '<td>' + String.fromCharCode(65 + j) + '</td>'

  }
  string += "</th>"

  for(var i = 1; i < gameConst.boardSize + 1; i++) {
    string += '<tr id="row' + i + '">'
    string += '<td>' + i + '</td>'
    for(var j = 0; j < gameConst.boardSize ; j++) {
      var col = String.fromCharCode(65 + j);
      var colour = gameConst.specialSquares[i][col] ? 'c' + gameConst.specialSquares[i][col] : "";
      var text = ""
      if(colour) {
        if(colour.charAt(0) == '2') {
          text += 'DOUBLE ';
        } else {
          text += 'TRIPLE ';
        }
        if(colour.charAt(1) == 'W') {
          text += 'WORD ';
        } else {
          text += 'LETTER ';
        }
        text += 'SCORE';
      }

      string += '<td id="cell' + i + col + '" class="' +
                colour + '"> <div class="cell">' + text + '</div></td>';
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
