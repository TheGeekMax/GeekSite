/*
 ----0----
 1 2 3 4 5
 --6- -7--
 8 9 a b c
 ----d----
*/
var data;
var neur
var cur = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var chked = false

var but = [];
function preload(){
 data = loadJSON('letters.json')
}

function setup(){
  createCanvas(220,250)
  background(0)
  
  neur = new NeuralNetwork(1,1000,14)
  
  but[0] = createButton('train x100')
  but[0].mousePressed(train100)
  but[0].position(10,260)
  
  
  but[1] = createInput()
  but[1].position(10,300)
  
  but[2] = createCheckbox(' : train',false)
  but[2].changed(chgevnt)
  but[2].position(10,340)
}

function draw(){
  for(let i =0; i < 14; i++){
	  segment(i,cur[i])
  }
  if(chked){
  train100()
  }
  pred()
}
function chgevnt(){
	if(this.checked()){
		chked = true
	}else{
		chked = false
	}
}

function train100(){
	for(let i = 0; i < 100; i ++){
		var xx = [0]
		var tr = data.all[int(random(0,15))].value
		for(let j = 0; j < 14; j ++){
			xx[0] += pow(2,j) * tr[j];
		}
		
		neur.train(xx, tr)
	}
}

function pred(){
	cur = neur.predict([int(but[1].value())])
	for(let i =0; i < 14;i++){
		if(cur[i] < 0.5){
			cur[i] = 0
		}else{
			cur[i] = 1
		}
	}
}

function segment(num,val){
	noStroke()
	if(val == 1){
		fill(240,0,0)
	}else{
		fill(150,0,0)
	}
	
	switch(num){
		case 0:
		rect(10,10,200,10)
		break;
		case 1:
		rect(10,20,10,100)
		break;
		case 2:
		beginShape();
		vertex(20,20)
		vertex(30,20)
		vertex(105,110)
		vertex(105,120)
		vertex(95,120)
		vertex(20,30)
		endShape(CLOSE);
		break;
		case 3:
		rect(105,20,10,100)
		break;
		case 4:
		beginShape();
		vertex(190,20)
		vertex(200,20)
		vertex(200,30)
		vertex(125,120)
		vertex(115,120)
		vertex(115,110)
		endShape(CLOSE);
		break;
		case 5:
		rect(200,20,10,100)
		break;
		case 6:
		rect(10,120,100,10)
		break;
		case 7:
		rect(110,120,100,10)
		break;
		case 8:
		rect(10,130,10,100)
		break;
		
		case 9:
		beginShape();
		vertex(95,130)
		vertex(105,130)
		vertex(105,140)
		vertex(30,230)
		vertex(20,230)
		vertex(20,220)
		endShape(CLOSE);
		break;
		case 10:
		rect(105,130,10,100)
		break;
		
		case 11:
		beginShape();
		vertex(115,130)
		vertex(125,130)
		vertex(200,220)
		vertex(200,230)
		vertex(190,230)
		vertex(115,140)
		endShape(CLOSE);
		break;
		
		case 12:
		rect(200,130,10,100)
		break;
		case 13:
		rect(10,230,200,10)
		break;
	}
}