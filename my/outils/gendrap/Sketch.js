var t =0
var nn1
var rgb ,lo,au,auu
var autt =0, autttt =0
var ggg =[]
function preload(){
 data = loadJSON("flags.json")
}

function setup(){
	createCanvas(300,200)
	background(0)
	noStroke()
	angleMode(DEGREES)
	let a = 3,b = 10,c = 5
	nn = [new NeuralNetwork(a,b,c),
	new NeuralNetwork(a,b,c),
	new NeuralNetwork(a,b,c),
	new NeuralNetwork(a,b,c),
	new NeuralNetwork(a,b,c)]
	var tr = createButton("train x100")
	tr.mousePressed(tr100)
	tr.position(10,210)
	
	var vals = createButton('validate')
	vals.mousePressed(ttt)
	vals.position(10,235)
	
	lo = createInput('')
	lo.position(100,210)
	lo.size(30)
	
	au = createCheckbox('auto trn',false)
	au.position(100,240)
	au.changed(aut)
	
	auu = createCheckbox('auto aff',false)
	auu.position(100,260)
	auu.changed(auttt)
	
	var hran = createButton('random')
	hran.mousePressed(ran)
	hran.position(10,260)
	
	var g = []
	for(let i = 0; i <= 4 ; i++){
		g[i] = createP('rgb ' + (i + 1))
		g[i].position(160,285 + i*40)
	}
	g[5] = createP('long flag')
	g[5].position(140,195)

	rgb = []
	for(let x = 0; x <= 4; x++){
		rgb[x] = []
		for(let y = 0; y <= 2; y++){
			rgb[x][y] = createInput('')
			rgb[x][y].size(40,20)
			rgb[x][y].position(10+y*50,300+x*40)
		}
	}

 
 for(let i =0; i< 3; i++){
 ggg[i] = createInput('0')
 ggg[i].position(220,210+i*30)
 ggg[i].size(40)
 }
}

function draw(){

 if(autt == 1){
tr100()
ttt()
}
if (autttt == 1){
 ttt()
}


}


function recta(color){
	fill(color)
	noStroke()
	rectMode(RADIUS)
	let ro = random(-(PI+HALF_PI),HALF_PI)
	let w = width/random(-3,3)
	let h = height/random(-3,3)
	let mh = height/2
	let mw = width/2
	let x = random(mw-200,mw+200)
	let y = random(mh-200,mh+200)
	push()
	translate(x,y)
	rotate(ro)
  
	rect(0,0,w,h)
  
	
	rotate(-ro)
	pop()
  
}

function testf(data){
 for(i =0; i< data.rgb.length; i ++){
  fill(data.rgb[i][0],data.rgb[i][1],data.rgb[i][2])
  
  push()
  translate(data.val[i][0],data.val[i][1])
  rotate(data.val[i][4])
  rect(0,0,data.val[i][2],data.val[i][3])
  rotate(-data.val[i][4])
  
  pop()
 }
}
function testa(col,val){
 background(int(ggg[0].value()),int(ggg[1].value()),int(ggg[2].value()))
 //print('yay')
 for(let i =0; i< col.length; i ++){
  fill(col[i][0],col[i][1],col[i][2])
  
  push()
  translate(val[i][0],val[i][1])
  rotate(val[i][4])
  rect(0,0,val[i][2],val[i][3])
  rotate(-val[i][4])
  
  pop()
 }
}

function find(data,name){
 let y =0
 for(i = 0; i < data.flag.length; i++){
  if(data.flag[i].name == name){
   y = i
  break;
  }
 }
 return y
}

function tr100(){
	for(i = 0; i < 100; i ++){
		var rd = int(random(0,data.flag.length-1))
		for(y = 0; y < data.flag[rd].rgb.length; y ++){
		 //print(data.flag[rd].rgb[y])
		// print(data.flag[rd].val[y])
		 let dc = data.flag[rd].rgb[y]
		 var ddc = 
		 [dc[0],
		 dc[1],
		 dc[2]]
		 
	 
		 let dv = data.flag[rd].val[y]
		 let ddv = 
		 [dv[0]/300,
		 dv[1]/200,
		 dv[2]/300,
		 dv[3]/200,
		 dv[4]/360]
		// console.log(dv)
			nn[y].train(ddc,ddv)
			//nn[0].train([0,0,255],[0,0,100,200,0])
		}
	}
}
function ttt(){
	//console.log('yay')
	var t =[]
	var a =[]
	
	
	
	for(let i = 0; i <= 4; i++){
		var w = 300
		var h = 200
		var r = 360
		
		t[i]= [int(rgb[i][0].value()),int(rgb[i][1].value()),int(rgb[i][2].value())]
		a[i]= nn[i].predict([t[i][0],t[i][1],t[i][2]])
		
		a[i][0] *= w
		a[i][1] *= h
		a[i][2] *= w
		a[i][3] *= h
		a[i][4] *= r
	}
	   
		var tt = []
		var aa = []
	if(lo.value() > 0 || lo.value() < 5){
		for (let i = 0; i < lo.value(); i++){
			tt[i] = t[i]
			aa[i] = a[i]
		}
	}
	//console.table(tt)
	//console.table(aa)
	testa(tt,aa)	   
	    
}

function aut(){
 if(this.checked()){
  autt = 1
 }
 else{
  autt =0
 }
}
function auttt(){
 if(this.checked()){
  autttt = 1
 }
 else{
  autttt =0
 }
}

function ran (){
 for(i=0; i <3; i++){
  rgb[0][i].value(int(random(0,255)))
  rgb[1][i].value(int(random(0,255)))
  rgb[2][i].value(int(random(0,255)))
  rgb[3][i].value(int(random(0,255)))
  rgb[4][i].value(int(random(0,255)))
 }
}