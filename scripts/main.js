/* To-do

BUGS: None

NEXT STEPS:

- Rework populate function to be object based, rather than loop through tiles
  Populate should function on levels starting with the highest order
  and working its way down the food chain (Tree -> Grass -> Seed)

FUTURE FEATURES:
- Create more organisms
  Bunny

- Create more oganism Behaviors
  Trees make Fruit every x turns
  Trees in groves ( 4 or more near each other) increase fruit production
  Bunnys eat

*/

var game = {
  cycle: function(e){
    if (!getTile(e)) {
      return false;
    }
    var activeTile = getTile(e);
    world.activeTile = activeTile;
    world.createTemp();
    world.activateTile();
    world.runRules();
    world.populate();
    world.print();
  }
};

var world = {
  tiles: [],
  tempTiles: [],
  day: 0,
  activeTile: false,

  // Create the initial board
  create: function (size) {
    var rows = size;
    var cols = size;
    var chance;

    for (var i = 0; i < cols; i++) {
      this.tiles.push([]);
      for (var j = 0; j < rows; j++) {
        chance = Math.random();
        if (chance < 0.10) {
          this.tiles[i].push(new Grass());
        }
        else {
          this.tiles[i].push(new Earth());
        }
      }
    }
  },

  createTemp: function () {
    var tempWorld = [], tempTile;

    for (var i = 0; i < this.tiles.length; i++) {
      tempWorld.push([]);
      for (var k = 0; k < this.tiles[i].length; k++) {
        tempTile = this.tiles[i][k];
        tempWorld[i].push(tempTile);
      }
    }

    this.tempTiles = tempWorld;
  },

  // Activates the last clicked tile
  activateTile: function() {
    var tilePos = this.activeTile;
    var row = tilePos[0];
    var col = tilePos[1];
    var tempTile = this.tempTiles[row][col];
    if ('activate' in tempTile) {
      tempTile = tempTile.activate();
      this.tempTiles[row][col] = tempTile;
    }
    return false;
  },

  runRules: function() {
    var tempTiles = [], tempTile;
    for (var i = 0; i < this.tempTiles.length; i++) {
      tempTiles.push([]);
      for (var j = 0; j < this.tempTiles[i].length; j++) {
        tempTile = this.tempTiles[i][j];
        tempTile = tempTile.rules();
        tempTiles[i].push(tempTile);
      }
    }
    this.tempTiles = tempTiles;
  },

  // Main game function
  populate: function () {
    this.tiles = this.tempTiles;
  },

  // Renders the current world.tiles matrix
  print: function() {
    var board = document.getElementById("board");
    var x = 0, y = 0;

    while (x < this.tiles.length) {
      while (y < this.tiles[x].length) {
        var tile = document.getElementById("tile-" + x + "-" + y);
        tile.className = "board-tile";

        switch (this.tiles[x][y].constructor) {
          case Earth:
            tile.className += " earth";
            break;
          case Seed:
            tile.className += " seed";
            break;
          case Grass:
            tile.className += " grass";
            break;
          default:
            break;
        }
        y++;
      }
      y=0;
      x++;
    }
  }
};

// Takes a cell in the matrix and returns its cardinal neighbors
getSurroundingTiles = function(row,col) {
  var u = [row-1, col];
  var r = [row, col+1];
  var d = [row+1, col];
  var l = [row, col-1];

  if (row === 0) {
    u = false;
  }
  if (row === 7) {
    d = false;
  }
  if (col === 0) {
    l = false;
  }
  if (col === 7) {
    r = false;
  }

  var tiles = [u,r,d,l];
  return tiles;
};

// Takes an array of cells and returns their values in the matrix
getSurroundingValues = function(tiles) {
  var values = [];
  for (var i = 0; i < tiles.length; i++) {
    var x = tiles[i][0];
    var y = tiles[i][1];
    if (tiles[i]) {
      values.push(world.tiles[x][y]);
    }
    else {
      values.push(-1);
    }
  }
  return values;
};

getNextStage = function (tile) {
  if (tile.turns >= tile.stages[tile.stage]) {
    tile.stage += 1;
  }
};
