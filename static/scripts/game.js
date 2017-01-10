var game = {
  players: [],
  newLetters: [],
  currPlayer: null,

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
    game.turns = 0;
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

    // game.getPlayerNames();

    // game.players[0].drawTurn();
    game.startGame();

  },

  startGame() {
    game.getPlayerNames();
    game.startTurn();

    $(function() {
      $(".draggable").draggable({
        stop: dragend
      });
    });
    $(document).on('click','#submit-turn button', game.submitTurn)

  },

  drawLetter(letter) {
    return '<div class="value">' + letter + '<sub>' + gameConst.scoreLetters[letter] + '</sub></div>';
    //"<div class="score">' + gameConst.scoreLetters[letter]+ '</div>'
  },
  endTurn() {
    var letters = [];
    $('td .draggable').each(function(e, o) {
      var cell = $(this);
      var string = cell.parent().attr('id');
      var row = string.substr(4, string.length - 5);
      var col = string.substr(string.length-1, 1);
      cell.toggleClass("draggable");
      cell.toggleClass("notdraggable");

      $(string).toggleClass("occupied");
      var letterScore = cell.children().first().html();
      var letter = letterScore.substr(0, letterScore.indexOf('<'));
      letters.push([row, col, letter])
      game.board[row][col] = letter;
      game.currPlayer.removeLetters([letter]);
    });

    if(game.turns == 0 && game.board[8][8] == "") {
      return false;
    }

    else {
      // game.currPlayer.
      return true;
    }


    game.currPlayer.topUp()

    if(letters.length == 0) {
      return false;
    }

    // $(".notdraggable").draggable({disable : true})

    // $("#cell" + row + col).toggleClass("occupied");

    // game.currPlayer.topUp();
    game.printBoard();
    return false;
  },
  drawScores() {
    $('#player-scores').remove();
    var table = '<div id="player-scores">';
    for (var i in game.players) {
      table +=  game.players[i].drawPlayerHeader();
      // table += '<p>' + game.players[i].name + ": " + game.players[i].score + '</p>'
    }
    table += "</div>";
    $('body').append(table);
  },
  printBoard() {
    for (var i = 1; i < gameConst.boardSize + 1; i++) {
      var string = "";
      for (var j = 0; j < gameConst.boardSize; j++) {
        var letter = game.board[i][String.fromCharCode(65 + j)];
        if(letter == "" ) {
          letter = "."
        }
        string += letter + " ";
      }
      console.log(string);
    }
  },

  startTurn() {
    game.currPlayer = game.players[game.turns % game.players.length];
    game.drawScores()
    game.currPlayer.drawTurn();

  },

  drawBoard() {
    var string = '<table id="board">';
    string += '<th id="row0">'
      // string += '<td></td>'
    for (var j = 0; j < gameConst.boardSize; j++) {
      string += '<td>' + String.fromCharCode(65 + j) + '</td>'

    }
    string += "</th>"

    for (var row = 1; row < gameConst.boardSize + 1; row++) {
      string += '<tr id="row' + row + '">'
      string += '<td>' + row + '</td>'
      for (var j = 0; j < gameConst.boardSize; j++) {
        var col = String.fromCharCode(65 + j);
        var colour = gameConst.specialSquares[row][col] ? 'c' + gameConst.specialSquares[row][col] : "";
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
        if(game.board[row][col] != "") {
          text = game.drawLetter(game.board[row][col]);
        }
        string += '<td id="cell' + row + col + '" class="' +
          colour + '"> <div class="cell">' + text + '</div></td>';
      }
      string += '</tr>'
    }
    string += '</table>'
    $("body").append(string);
  },
  submitTurn() {
    if(!game.endTurn()) {
      // return;
    }
    game.turns++;
    game.startTurn();
  }

}
