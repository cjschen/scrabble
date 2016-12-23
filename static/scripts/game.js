var game = {
  players: [],
  // constructor(players) {
  //   this.players = players;
  //   initGame();
  // }

  getPlayerNames() {
    var url = window.location.href;
    var queryStart = url.indexOf("?") + 1,
    queryEnd = url.indexOf("#") + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.replace(/\+/g, " ").split("&");

    for (var i = 0; i < pairs.length; i++) {
      playerName = pairs[i].split("=")[1];
      if(playerName == "") {
        playerName = "Player " + (i + 1);
      }
      game.players.push(new Player(playerName, i));
    }
  },

  initLetters(callback) {
    $.post('/randomize', function(result) {
      game.letters = eval(result);
      callback();
    });
  },

  initGameVars() {
    game.board = {};
    for (var i = 1; i < gameConst.boardSize + 1; i++) {
      game.board[i] = {};
      for (var j = 0; j < gameConst.boardSize; j++) {
        game.board[i][String.fromCharCode(65 + j)] = "";
      }
    }

    game.initLetters(game.initGame)

  },

  initGame() {

    // game.initLet ters();
    game.boardUI = {};
    game.boardUI.offset = $('#cell1A').position();
    game.boardUI.dimens = {
      width: $('#cell1A').outerWidth(),
      height: $('#cell1A').outerHeight()
    };

    game.getPlayerNames();

    game.players[0].drawTurn();

    $(function() {
      $(".letter").draggable({
        stop: dragend
      });
    });

    $("button").on('click', this.submitTurn)
  },

  startGame() {
    getPlayerNames();
  },

  drawLetter(letter) {
    return '<div class="value">' + letter + '<sub>' + gameConst.scoreLetters[letter] + '</sub></div>';
    //"<div class="score">' + gameConst.scoreLetters[letter]+ '</div>'
  },

  drawBoard() {
    var string = '<table class="board">';
    string += '<th id="row0">'
      // string += '<td></td>'
    for (var j = 0; j < gameConst.boardSize; j++) {
      string += '<td>' + String.fromCharCode(65 + j) + '</td>'

    }
    string += "</th>"

    for (var i = 1; i < gameConst.boardSize + 1; i++) {
      string += '<tr id="row' + i + '">'
      string += '<td>' + i + '</td>'
      for (var j = 0; j < gameConst.boardSize; j++) {
        var col = String.fromCharCode(65 + j);
        var colour = gameConst.specialSquares[i][col] ? 'c' + gameConst.specialSquares[i][col] : "";
        var text = ""
        if (colour) {
          if (colour.charAt(0) == '2') {
            text += 'DOUBLE ';
          } else {
            text += 'TRIPLE ';
          }
          if (colour.charAt(1) == 'W') {
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
  },
  submitTurn() {
    console.log("Clicked Submit")
  }

}
