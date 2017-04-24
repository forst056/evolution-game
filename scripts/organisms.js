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

Organism.prototype.cardinalNeighbors = function(){
  return true;// Get the organisms up/down/left/right of this
};
Organism.prototype.cornerNeighbors = function(){
  // Get the organisms up-left/up-right/down-left/down-right of this
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
  this.life = Math.floor(Math.random() * 3)+28; // lasts for 5 turns and then decomposes
  this.stages = [0,8];
  this.update = 3;
  this.row = row;
  this.col = col;
}
Grass.prototype = new Organism();
Grass.prototype.constructor = Grass;
Grass.prototype.rules = function() {
  this.life -= 1;
  if (!this.life) {
    return new Earth();
  }
  return this;
};

function Tree(row,col) {
  this.life = Math.floor(Math.random() * 3)+28; // lasts for 5 turns and then decomposes
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
