$(document).ready(function() {
  init();
  $("#num-players-select").on('change', drawPlayerSelection);

});

function init() {
  drawPlayerSelection();
}

function drawPlayerSelection(e) {
  var num = $("#num-players-select").find("option:selected").val();
  $("#players-select").empty();
  for(var i = 0; i < num; i++) {
    var player = "";
    var playerName = 'Player ' + (i + 1);
    player += '<div class="input-group">';
    player +=   '<span class="input-group-addon">';
    player +=     '<svg width="10" height="10" class="player-color">';
    player +=       '<rect width="10" height="10"';
    player +=       'style="fill:' + gameConst.playerColor[i] + ";";
    player +=       'stroke-width:1;stroke:rgb(0,0,0)"/>';
    player +=     '</svg>' + playerName;
    player +=   '</span>';
    player +=   '<input type="text" class="form-control" name="' + playerName + '" placeholder="Name">';
    player += '</div>'
    $("#players-select").append(player);
  }
}
