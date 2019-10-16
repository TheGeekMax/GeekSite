

var cols, rows;
var w =10
var grid = [];
var sliv = 15
var current;

var scn

var stack = [];
var uni = false

function restartt(){
 removeElements()
 uni = false
 grid=[]
 for (var   j = 0; j < rows; j++) {
  for (var i = 0; i < cols; i++) {
   var cell = new Cell(i, j);
   grid.push(cell);
  }
 }
  sli = createSlider(1,200,sliv,1)
  sli.size(400)
  sli.position(10,410)
 
 current = grid[0];
}

function restarttt(){
 sliv = sli.value()
 restartt()
}

function setup() {
 scn = new SceneManager();
 
 
 createCanvas(400, 400);
 cols = floor(width/w);
 rows = floor(height/w);
 //frameRate(5);
 restartt()
 
 
}

function draw() {
 //print(stack.length)
 background(51);
 for (var i = 0; i < grid.length; i++) {
  grid[i].show();
 }
 
 for(let gg = 0; gg < sli.value(); gg++){
 
 current.visited = true;
 
 // STEP 1
 var next = current.checkNeighbors();
 if (next) {
  next.visited = true;
  
  // STEP 2
  stack.push(current);
  
  // STEP 3
  removeWalls(current, next);
  
  // STEP 4
  current = next;
 } else if (stack.length > 0) {
  current.hi = true
  current = stack.pop();
  current.hi = true
 }else if(stack.length === 0  && !uni){
  uni = true
  but = createButton('play')
  but.style("border:none")
  but.size(400,100)
  but.position(10,450)
  but.mousePressed(play);
  
  but2 = createButton('restart')
  but2.style("border:none")
  but2.size(400,100)
  but2.position(10,550)
  but2.mousePressed(restarttt);
  
  but3 = createButton('path f')
  but3.style("border:none")
  but3.size(400,100)
  but3.position(10,650)
  but3.mousePressed(patt);
 }
 }
}

function play(){
	scn.wire();
 scn.showScene(games)
}

function patt(){
	scn.wire();
	scn.showScene(pathfind)
}

function index(i, j) {
 if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
  return -1;
 }
 return i + j * cols;
}


function removeWalls(a, b) {
 var x = a.i - b.i;
 if (x === 1) {
  a.walls[3] = false;
  b.walls[1] = false;
 } else if (x === -1) {
  a.walls[1] = false;
  b.walls[3] = false;
 }
 var y = a.j - b.j;
 if (y === 1) {
  a.walls[0] = false;
  b.walls[2] = false;
 } else if (y === -1) {
  a.walls[2] = false;
  b.walls[0] = false;
 }
}

function Cell(i, j) {
 this.i = i;
 this.j = j;
 this.walls = [true, true, true, true];
 this.visited = false;
 this.visited2 = false;
 this.dead = false;
 this.hi = false;
 
 this.checkNeighbors2 = function() {
  var neighbors = [];
  
  var top    = grid[index(i, j -1)];
  var right  = grid[index(i+1, j)];
  var bottom = grid[index(i, j+1)];
  var left   = grid[index(i-1, j)];
  
  if (top && !top.visited2 && !this.walls[0]) {
   neighbors.push(top);
  }
  if (right && !right.visited2 && !this.walls[1]) {
   neighbors.push(right);
  }
  if (bottom && !bottom.visited2 && !this.walls[2]) {
   neighbors.push(bottom);
  }
  if (left && !left.visited2 && !this.walls[3]) {
   neighbors.push(left);
  }
  
  if (neighbors.length > 0) {
   var r = floor(random(0, neighbors.length));
   return neighbors[r];
  } else {
   return undefined;
  }
  
  
 }
 this.checkNeighbors = function() {
  var neighbors = [];
  
  var top    = grid[index(i, j -1)];
  var right  = grid[index(i+1, j)];
  var bottom = grid[index(i, j+1)];
  var left   = grid[index(i-1, j)];
  
  if (top && !top.visited) {
   neighbors.push(top);
  }
  if (right && !right.visited) {
   neighbors.push(right);
  }
  if (bottom && !bottom.visited) {
   neighbors.push(bottom);
  }
  if (left && !left.visited) {
   neighbors.push(left);
  }
  
  if (neighbors.length > 0) {
   var r = floor(random(0, neighbors.length));
   return neighbors[r];
  } else {
   return undefined;
  }
  
  
 }
 this.highlight = function() {
  var x = this.i*w;
  var y = this.j*w;
  noStroke();
  fill(0, 0, 255, 100);
  rect(x, y, w, w);
  
 }
 this.show = function() {
  var x = this.i*w;
  var y = this.j*w;
  noStroke()
  if(this.hi){
   fill(0,200,200)
   rect(x,y,w,w)
  }
  if(this.visited2){
   fill(0,200,0)
   rect(x,y,w,w)
  }
  
  stroke(255);
  if (this.walls[0]) {
   line(x    , y    , x + w, y);
  }
  if (this.walls[1]) {
   line(x + w, y    , x + w, y + w);
  }
  if (this.walls[2]) {
   line(x + w, y + w, x    , y + w);
  }
  if (this.walls[3]) {
   line(x    , y + w, x    , y);
  }
  
  if (this.dead) {
   noStroke();
   fill(0, 0, 0,200);
   rect(x, y, w, w);
  }
 }
}