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
  return new Earth();
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

function Earth(row,col) {
  this.update = 1;
  this.row = row;
  this.col = col;
}
Earth.prototype = new Organism();
Earth.prototype.constructor = Earth;
Earth.prototype.rules = function() {
  return this;
};
Earth.prototype.activate = function() {
  return new Seed();
};

function Seed(row,col) {
  this.delay = Math.floor(Math.random() * 2)+3; // takes 3 turns to become Grass
  this.update = 2;
  this.row = row;
  this.col = col;
}
Seed.prototype = new Organism();
Seed.prototype.constructor = Seed;
Seed.prototype.rules = function() {
  this.delay -= 1;
  if (!this.delay) {
    return new Grass();
  }
  return this;
};


function Grass(row,col) {
  this.life = Math.floor(Math.random() * 3)+28; // lasts for 28-30 turns and then decomposes
  this.stages = [0,8];
  this.update = 3;
  this.row = row;
  this.col = col;
}
Grass.prototype = new Organism();
Grass.prototype.constructor = Grass;
Grass.prototype.check = function() {
  var n = this.neighbors();
  console.log(world.tiles[n[0]]);
  var i = n.length;
  while (i--) {
    if (world.tiles[n[i]] !== Grass) {
      return this;
    }
    return new Tree(this.row,this.col);
  }
}
Grass.prototype.rules = function() {
  this.life -= 1;
  if (!this.life) {
    return new Earth();
  }
  return this;
};

function Tree(row,col) {
  this.life = Math.floor(Math.random() * 3)+28; // lasts for 28-30 turns and then decomposes
  this.stages = [0,8];
  this.update = 4;
  this.row = row;
  this.col = col;
}
Tree.prototype = new Organism();
Tree.prototype.constructor = Tree;
Tree.prototype.rules = function() {
  this.life -= 1;
  if (!this.life) {
    return new Earth();
  }
  return this;
};
