/* To Do

NEXT-STEPS:
- Finish getStage function
  get the stage of the Organism
  set the appropriate class name so background asset reflects growth stage

FUTURE FEATURES:
- Add CSS transitions after turns

*/

writeNewBoard = function () {
  var board = document.getElementById("board");
  var x = 0, y = 0;

  while (x < world.tiles.length) {
    var row = document.createElement("div");
    row.className = "row";
    row.id = "row-" + x;
    board.appendChild(row);

    while (y < world.tiles[x].length) {
      var tile = document.createElement("div");
      tile.className = "board-tile";
      tile.id = "tile-" + x + "-" + y;
      row.appendChild(tile);
      y++;
    }
    y=0;
    x++;
  }
};

newGame = function () {
  var button = document.getElementById("start-button");
  button.parentNode.removeChild(button);
  world.create(8);
  writeNewBoard();
  world.print();
};

getTile = function(e) {
  var target = e.target;
  if (target.className.includes("board-tile")) {

    var id = target.id;
    var array = id.split("-");
    var row = parseInt(array[1]);
    var col = parseInt(array[2]);
    var tile = [row, col];

    if (world.tiles[row][col] > 0) {
      return false;
    }

    return tile;
  }
  return false;
};

getStage = function(tile) {
  if (tile.stage > 1) {
    var t = getElementById()
  }
};

// writeOrganism = function(tile) {
//   var row = tile[0];
//   var col = tile[1];
//   world.tiles[row][col] = new Seed();
// };
