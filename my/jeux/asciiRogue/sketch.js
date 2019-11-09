var x
var y
var longs = 20
var pl
var mr = []
var bb = []
var all = []

var bombDroppedWait = false

var temp = false
var temp2 = 0
var pldet

var debug = false
var sortie = true

var debugO = []
var debugI = ["vide","mur","monstre","coffre","coffre","player","bomb"]
var debugInd = 0

var defTimeP;
var defTime = 0

var expTimeP;
var expTime = 0
function setup(){
	createCanvas(760,760)
	background(0)
	x = width/longs
	y = height/longs

	//disparition Game over et chgname
	$("#GO").hide()
	$("#chgName").hide()

	for(let j =0; j < y;j++){
		for(let i =0; i < x;i++){
				all.push(new pix(0,i,j))
		}
	}
	pl = new player(1,1,10,10)
	//details du joueur
	pldet = createP("Player, PV:0 degats : 0").position(10,height)

	//creation objet pour debug
	debugO.push(createButton("/\\").position(width+10,20).size(40,40).id("debugS1").mousePressed(() => Debugchg(1)))
	debugO.push(createButton("\\/").position(width+50,20).size(40,40).id("debugS2").mousePressed(() => Debugchg(-1)))
	debugO.push(createP(debugI[debugInd]).position(width+10,50).id("debugS3"))

	defTimeP = createP("defusing ("+defTime+")").position(width/2,height + 20).id("defu")
	expTimeP = createP("explosion in "+expTime+" mouvements(s)").position(width/2,height + 60).id("defus")

	generate()

	if($("#inName").val() == ""){
		$("#inName").val("Player");
	}
	pl.name = $("#inName").val();
	$("#inName").on("keyup change", function() {
	pl.name = $("#inName").val();
	})
	createButton("change name").position(10,height+5).size(150,30).mousePressed(() => pl.updateName())

	$("#closes").click(function(){
		$("#infos").hide()
	})
}

function Debugchg(nnbr){
	if(debugInd+nnbr >= 0 && debugInd+nnbr < debugI.length){
		debugInd += nnbr
	}
}

function draw(){
	//verif si mort
	if(pl.died){
		$("#GO").show()
	}
	//walls
	for(let xx = 0 ; xx < x ; xx++){
		for(let yy = 0 ; yy < x ; yy++){
			if(xx == 0 || xx == x-1 || yy == 0 || yy == y-1){
				all[xx+yy*y].type = 1
			}
		}	
	}
	//desactivation debug
	if(debug){
		$("#debugS1").show()
		$("#debugS2").show()
		$("#debugS3").show()
	}else{
		$("#debugS1").hide()
		$("#debugS2").hide()
		$("#debugS3").hide()
	}
	//decrementation fuse
	if(defTime > 0){
		$("#defu").show()
		defTimeP.html("defusing ("+defTime+")")
	}else{
		$("#defu").hide()
	}

	if(expTime > 0){
		$("#defus").show()
		expTimeP.html("explosion in "+expTime+" mouvements(s)")
	}else{
		$("#defus").hide()
	}

	pl.levelup()
	pldet.html(""+pl.name +'<br> PV:'+pl.health+'/'+pl.maxH+'<br>degats : '+pl.damage + '<br>exp :' +pl.exp+'/'+pl.maxE + '<br>lvl ' + pl.level)
	// $("#monsterL").append("<p>lol</p>")
	background(0)
	show()
	if(debug){
		debugO[2].html(debugI[debugInd])
		if(mouseIsPressed && !temp){
			xx = int(mouseX/(width/x))
			yy = int(mouseY/(width/y))
			ind = xx + yy * y
			temp = true
			if(all[ind]){
			temp2 = all[ind].type
			}
		}else if(!mouseIsPressed && temp){
			temp = false
		}
		if(mouseIsPressed && temp){
			xx = int(mouseX/(width/x))
			yy = int(mouseY/(width/y))
			if(xx >= 0 && xx < x && yy >= 0 && yy < y ){
				ind = xx + yy * y
				if(all[ind].type != 5 && all[ind].type != 2){
					all[ind].type = debugInd
					if(debugInd == 2){
						mr.push(new monster(xx,yy,10,2))
					}
				}
			}
		}
	}
	
	//update monster

	max = mr.length
	for(let i = 0; i < max; i++){
		if(mr[i].health <= 0){
			all[mr[i].x+mr[i].y*y].type = 0
			$("#" + mr[i].id).remove()
			pl.exp += mr[i].exp
			mr.splice(i,1)
			i = 0
			max--
		}else{
		mr[i].update()
		}
	}

	if(mr.length == 0 && sortie == false){
		var xx = 0
		var yy = 0
		while(all[xx + yy * y].type != 0){
			xx = int(random()*x)
			yy = int(random()*y)
		}
		all[xx+yy*y].type = 4
		sortie = true
	}
}

function chgName(nm){
	pl.name = nm
}

function keyPressed(){
	if(key == " " && !bombDroppedWait){
		bombDroppedWait = true
	}

	if(!bombDroppedWait){
	pl.move(keyCode)
	
	if(key == "c" && debug){
		for(let x =0; x <100;x++){
			pl.exp = pl.maxE
			pl.levelup()
		}
	}
	
	if(keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW || keyCode == UP_ARROW || keyCode == DOWN_ARROW){
		for(let i = 0; i < mr.length; i++){
		mr[i].move()
	}
	if(pl.health < pl.maxH && random() > 0.9){
		pl.health ++
	}

	//update bombs
	max = bb.length
	for(let iii = 0 ; iii < max; iii ++){
		if(bb[iii].defuse()){
			bb.splice(iii,1)

			iii = 0
			max --
		}
	}

	//down bomb defuse
	if(defTime > 0){
		defTime--
	}
	if(expTime > 0){
		expTime--
	}
	
	}
	}

	if(bombDroppedWait){
			if(keyCode == LEFT_ARROW){
				let ind = (pl.x-1)+(pl.y) * y
				if(all[ind].type == 0 && defTime == 0){
				bb.push(new bomb(pl.x-1,pl.y,pl.Bradius+1,pl.Bradius))
				defTime = 15
				expTime = bb[bb.length-1].fuse
				}
				bombDroppedWait = false
			}
			if(keyCode == RIGHT_ARROW){
				let ind = (pl.x+1)+(pl.y) * y
				if(all[ind].type == 0 && defTime == 0){
				bb.push(new bomb(pl.x+1,pl.y,pl.Bradius+1,pl.Bradius))
				defTime = 15
				expTime = bb[bb.length-1].fuse
				}
				bombDroppedWait = false
			}
			if(keyCode == UP_ARROW){
				let ind = (pl.x)+(pl.y-1) * y
				if(all[ind].type == 0 && defTime == 0){
				bb.push(new bomb(pl.x,pl.y-1,pl.Bradius+1,pl.Bradius))
				defTime = 15
				expTime = bb[bb.length-1].fuse
				}
				bombDroppedWait = false
			}		
			if(keyCode == DOWN_ARROW){
				let ind = (pl.x)+(pl.y+1) * y
				if(all[ind].type == 0 && defTime == 0){
				bb.push(new bomb(pl.x,pl.y+1,pl.Bradius+1,pl.Bradius))
				defTime = 15
				expTime = bb[bb.length-1].fuse
				}
				bombDroppedWait = false
			}
		
	}
}

function show(){
	for(let i = 0 ; i < all.length;i++){
		all[i].show()
	}


}

//partie generation du monde
function generate(){
	sortie = false
	/*
	0 = vide
	1 = mur
	2 = monstre
	3 = chest
	4 = exit
	5 = joueur 
	*/
	ca = new CA(x,y)

	//effacement de tt la map
	mr = []
	for(let i = 0 ; i < all.length; i ++){
			all[i].type = 0
	}

	//ajout de tout les composants
	ca.addType("mur")		//1
	ca.addType("monstre")	//2
	ca.addType("chest")		//3

	//ajout des regles
	ca.addRule(0,1,1,[0,0,0,0,0,1,1,1,1])
	ca.addRule(1,0,1,[1,1,1,1,0,0,0,0,0])

	//ajout des cells
	ca.rand(1,45)

	//generation salle
	var steps = int(random()*5)+5
	for(let i = 0 ; i < steps;i++){
		ca.step(1)
	}

	//ajout des coffres et des enemies
	ca.rand(2,1)
	ca.rand(3,0.5)

	//mise en place dans all[]
	for(let i = 0 ; i < x; i++){
		for(let j = 0 ; j < y; j++){
			switch(ca.cells[i+j*y]){
				case 1:
					all[i+j*y].type = 1
					break
				case 2:
					if(i == 0 || i == x-1 || j == 0 || j == y-1){
						all[i+j*y].type = 1
					}else{
						var life = int(((random()*10)+5).toFixed(2))*((pl.level+1)/4)
						mr.push(new monster(i,j,life,life/2))
					}
					break;
				case 3:
					all[i+j*y].type = 3
					break
			}
			if((i == 0 || i == x-1) || (j == 0 || j == y-1)){
				all[i+j*y].type = 1
			}
		}
	}

	//chgment du joueur
	var xx = int(x/2)
	var yy = int(y/2)
	var lim = 0
	while(all[xx+yy*y].type == 1 && lim < 50){
		xx = int(random()*x)
		yy = int(random()*x)
		lim++
	}
	pl.chgCoors(xx,yy)
}


function verify(){
	for(let i = 0 ; i < all.length; i++){
		if(all[i].type == 0 && all[i].id !=-1){
			return true
		}
	}
	return false
}

function contamine(xx,yy,ids){
	pointsX = []
	pointsY = []
	pointsX.push(xx)
	pointsY.push(yy)
	for(let i = 0; i < x*y; i++){
		for(let j = 0; j < pointsX.length; j++){
			all[pointsX[j] + pointsY[j] * y].id = ids
		}
		tx =[]
		ty =[]
		for(let j = 0; j < pointsX.length; j++){
			if(all[(pointsX[j]+1)+(pointsY[j])*y].id == -1 && all[(pointsX[j]+1)+(pointsY[j])*y].type == 0){
				tx.push(pointsX[j]+1)
				ty.push(pointsY[j])
			}
			if(all[(pointsX[j]-1)+(pointsY[j])*y].id == -1 && all[(pointsX[j]-1)+(pointsY[j])*y].type == 0){
				tx.push(pointsX[j]-1)
				ty.push(pointsY[j])
			}
			if(all[(pointsX[j])+(pointsY[j]+1)*y].id == -1 && all[(pointsX[j])+(pointsY[j]+1)*y].type == 0){
				tx.push(pointsX[j])
				ty.push(pointsY[j]+1)
			}
			if(all[(pointsX[j])+(pointsY[j]-1)*y].id == -1 && all[(pointsX[j])+(pointsY[j]-1)*y].type == 0){
				tx.push(pointsX[j])
				ty.push(pointsY[j]-1)
			}
		}
		pointsX = tx
		pointsY = ty
	}

	for(let i = 0 ; i < all.length; i++){
		if(all[i].id == 1){
			all[i].type = 4
		}
	}
}

