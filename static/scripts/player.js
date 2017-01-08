class Player {
  constructor(name, number) {
    this.name = name;
    this.number = number;
    this.letters = [];
    this.score = 0;
    this.topUp()
  }
  addScore(score) {
    this.score += score;
  }
  removeLetters(letters) {
    for(var i in letters) {
      this.letters.splice(this.letters.indexOf(letters[i]));
    }
    console.log(this.letters);
  }

  topUp() {
    var n =  gameConst.maxPlayerLetters - this.letters.length;

    var letters = game.letters.splice(0, n)

    this.addLetters(letters)
  }

  addLetters(letters) {
    this.letters = this.letters.concat(letters)
  }

  getLetters() {
    return this.letters
  }
  drawPlayerHeader() {
    var string += "<div id='player-header'>"
    string +=     '<svg width="10" height="10" class="player-color">';
    string +=       '<rect width="10" height="10"';
    string +=       'style="fill:' + gameConst.playerColor[this.number] + ";";
    string +=       'stroke-width:1;stroke:rgb(0,0,0)"/>';
    string +=     '</svg>' + this.name;
    string +=   '</div>';
    return string;
  }
  drawTurn() {
    $("#player-letters").remove();
    var string = '<div id="player-letters">';
    string += drawPlayerHeader();
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
