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
         string += '<div class="letter draggable">' + game.drawLetter(this.letters[i]) + "</div>"
    }
    string += "</div>"
    string += "<div id='submit-turn'>"
    string += "<button> Submit </button>"
    string += "</div>"
    string += "</div>"

    $("body").append(string);
  }
}
