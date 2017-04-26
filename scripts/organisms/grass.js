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
  var n0, n1, thisTile;
  var i = n.length;
  while (i--) {
    if (n[i]) {
      n0 = n[i][0];
      n1 = n[i][1];
      thisTile = world.tiles[n0][n1];
      if (!(thisTile instanceof Grass)) {
        return this;
      }
      return new Tree(this.row,this.col);
    }
    return this;
  }
}
Grass.prototype.rules = function() {
  this.life -= 1;
  if (!this.life) {
    return new Earth(this.row, this.col);
  }
  return this;
};
