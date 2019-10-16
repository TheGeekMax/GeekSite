function games(){
 var px = 0;
 var pys = 0;
 var tai = 400/11
 var lo = 400/w
 var but = []
 var cheat = [1,1,3,3,4,2,4,2]
 //var cheat = [1,3,4,2]
 var ch = 0
 var cch = false
 var lor = 0
    this.setup = function(){
     removeElements()
     createCanvas(400,400)
     colorMode(RGB)
     recreate()
     }
    
    this.draw = function(){
     push()
     translate(tai*5,tai*5)
     translate(tai*-px,tai*-pys)
     background(0)
     affiche()
     
     pop()
     
     noStroke()
     fill(255,0,0)
     
     switch(lor){
      case 0:
       ellipse(5*tai+(tai/2),5*tai+(tai/2),tai-20,tai-20)
       break;
      case 1:
       ellipse(5*tai+(tai/2),5*tai+(tai/2)-5,tai-20,tai-20)
       break;
      case 2:
       ellipse(5*tai+(tai/2)+5,5*tai+(tai/2),tai-20,tai-20)
       break;
      case 3:
       ellipse(5*tai+(tai/2),5*tai+(tai/2)+5,tai-20,tai-20)
       break;
      case 4:
       ellipse(5*tai+(tai/2)-5,5*tai+(tai/2),tai-20,tai-20)
       break;
     }
     
     
    }
    
    this.keyPressed = function(){
     removeElements()
     if (keyCode === UP_ARROW){
      bouge(1);
     }
     if (keyCode === RIGHT_ARROW){
      bouge(2);
     }
     if (keyCode === DOWN_ARROW){
      bouge(3);
     }
     if (keyCode === LEFT_ARROW){
      bouge(4);
     }
     bb = createButton('move button')
     bb.position(100,410)
     bb.size(200,100)
     bb.style("border:none;border-radius:10px")
     bb.mousePressed(recreate)
    }
  
  function recreate(){
   removeElements();
   but[0] = createButton('/\\')
   but[0].size(100,50)
   but[0].style("border:none")
   but[0].position(150,410)
   but[0].mousePressed(() => bouge(1))
   
   but[1] = createButton('\\/')
   but[1].size(100,50)
   but[1].style("border:none")
   but[1].position(150,460)
   but[1].mousePressed(() => bouge(3))
   
   but[2] = createButton('<')
   but[2].size(100,100)
   but[2].style("border:none;border-top-left-radius:25px;border-bottom-left-radius:25px")
   but[2].position(50,410)
   but[2].mousePressed(() => bouge(4))
   
   but[3] = createButton('>')
   but[3].size(100,100)
   but[3].style("border:none;border-top-right-radius:25px;border-bottom-right-radius:25px")
   but[3].position(250,410)
   but[3].mousePressed(() => bouge(2))
   
  }
  
  function affiche(){
   for(let x = 0; x < lo; x++){
    for(let y = 0; y < lo; y++){
	var cur = x + y*lo
     var xt = x*tai
     var yt = y*tai
	 
     fill(0,0,200);
	 if(!grid[cur].dead && grid[cur].visited2){
		fill(0,200,0)
	 }
     noStroke();
     rect(x*tai,y*tai,tai+1,tai+1)
     stroke(255)
     strokeWeight(1)
     
     if(grid[cur].walls[0]){
      
      line(xt,yt,xt+tai,yt)
     }
     if(grid[cur].walls[1]){
      
      line(xt+tai,yt,xt+tai,yt+tai)
     }
     if(grid[cur].walls[2]){
      
      line(xt,yt+tai,xt+tai,yt+tai)
     }
     if(grid[cur].walls[3]){
      
      line(xt,yt,xt,yt+tai)
     }
    }
   }
  }
  
  function bouge(val){
   lor = val
   if (cheat[ch] == val){
    ch++
    if(ch == cheat.length){
     ch = 10
     cch = true
     var pp =createP('cheat activé')
     pp.position(0,500)
    }
   }
   else{
    ch =0
   }
   var cur = px + pys*lo
   if(val == 1 ){
    if(!grid[cur].walls[0] || cch){
    pys --
    }
   }
   if(val == 2 ){
    if(!grid[cur].walls[1] || cch){
    px ++;
    }
   }
   if(val == 3 ){
    if(!grid[cur].walls[2] || cch){
    pys ++;
    }
   }
   if(val == 4 ){
    if(!grid[cur].walls[3] || cch){
    px --;
    }
   }
  }
 }