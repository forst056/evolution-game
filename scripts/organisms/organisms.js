// Define the organisms and their rules here
// Rules should always return an organism
// Activate may trigger events, but should always return an organism

// Behaviors:
// - Delay: Counts down. When this reaches 0. Birth.
// - Life: Counts down. When this reaches 0. Death.

function Organism() {
  this.row = false;
  this.col = false;
  this.turns = 0;
  this.stage = 0;
  this.stages = [0];
  this.update = 0;
}

Organism.prototype.activate = function() {
  return new Earth(this.row, this.col);
};

Organism.prototype.neighbors = function(){
  var n = [this.row - 1, this.col];
  var e = [this.row, this.col + 1];
  var s = [this.row + 1, this.col];
  var w = [this.row, this.col - 1];
  var neighbors = [n, e, s, w];

  for (var i = 0; i < neighbors.length; i++) {
    if (neighbors[i].includes(-1) || neighbors[i].includes(8)) {
      neighbors[i] = false;
    }
  }

  return neighbors;
};

Organism.prototype.cornerNeighbors = function(){
  var nw = [this.row - 1, this.col - 1];
  var ne = [this.row - 1 , this.col + 1];
  var se = [this.row + 1, this.col + 1];
  var sw = [this.row + 1, this.col - 1];
  var cNeighbors = [nw, ne, se, sw];

  for (var i = 0; i < cNeighbors.length; i++) {
    if (cNeighbors[i].includes(-1) || cNeighbors[i].includes(8)) {
      cNeighbors[i] = false;
    }
  }

  return cNeighbors;
};
