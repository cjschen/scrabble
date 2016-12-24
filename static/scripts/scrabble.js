var lastHovered;

$(document).ready(function() {
  init();
});

function init() {
  // game.initLetters();
  game.initGameVars();
  game.drawBoard();
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
  var html = $(this).html();
  $("#cell" + row + col).append('<div class="letter draggable">' + html + '</div>');
  $(this).remove();
  $(function() {
    $(".letter").draggable({
      stop: dragend
    });
  });
}
