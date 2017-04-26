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
  return new Seed(this.row, this.col);
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
    return new Grass(this.row, this.col);
  }
  return this;
};
