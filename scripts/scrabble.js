var lastHovered;

$(document).ready(function() {
  init();

  $('#submit-turn button').click(onSubmit);
});

function drawLetter(letter) {
  return '<div class="value">' + letter + '<sub>'+ gameConst.scoreLetters[letter] + '</sub></div>';
  //"<div class="score">' + gameConst.scoreLetters[letter]+ '</div>'
}

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
    var string = '<div id="player-letters">';
    string += "<div id='player-header'>"
    string +=     '<svg width="10" height="10" class="player-color">';
    string +=       '<rect width="10" height="10"';
    string +=       'style="fill:' + gameConst.playerColor[this.number] + ";";
    string +=       'stroke-width:1;stroke:rgb(0,0,0)"/>';
    string +=     '</svg>' + this.name;
    string +=   '</div>';
    string +=   '<div id="letter-rack">';

    for(var i in this.letters) {
         string += '<div class="letter draggable">' + drawLetter(this.letters[i]) + "</div>"
    }
    string += "</div>"
    string += "<div id='submit-turn'>"
    string += "<button> Submit </button>"
    string += "</div>"
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
  game.boardUI = {};
  game.boardUI.offset = $('#cell1A').position();
  game.boardUI.dimens = {width: $('#cell1A').outerWidth(), height: $('#cell1A').outerHeight()};


  // $(".letter").on("dragstop", drag
  // Handle
}

function dragend(event, ui) {

  var pos = $(this).position();

  var colFloat = (pos.left - game.boardUI.offset.left) / game.boardUI.dimens.height;
  var rowFloat = (pos.top - game.boardUI.offset.top) / game.boardUI.dimens.width;
  var row = Math.floor(rowFloat + 0.5) + 1;
  var col = Math.floor(colFloat + 0.5) + 1;

  if(row < 0 || col < 0 || row > 15 || col > 15) {
    return;
  }

  var col = String.fromCharCode(65 + col - 1)
  if($("#cell" + row + col).hasClass("occupied")) {
    return;
  }
  $("#cell" + row + col).empty();
  $("#cell" + row + col).toggleClass("occupied");
  var html = $(this).html();
  $("#cell" + row + col).append('<div class="letter draggable">' + html + '</div>');
  $(this).remove();
  $(function() {
    $(".letter").draggable({
      stop: dragend
    });
  });
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
