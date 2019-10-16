function pathfind(){
 var thes
	this.setup = function(){
		removeElements();
		current = grid[0];
		stack = []
		uni = false
		thes = createSlider(1,100,10,1)
		thes.size(400)
		thes.position(10,410)
		
	}
	this.draw = function(){
		background(51);
		for (var i = 0; i < grid.length; i++) {
			grid[i].show();
		}
		for(let iii = 0; iii < thes.value(); iii++){
			current.visited2 = true;
		
			// STEP 1
			var next = current.checkNeighbors2();
			
			
			
			if (next && !uni) {
			next.visited2 = true;
		
			// STEP 2
			stack.push(current);
		

			current = next;
			}
			else if (!uni) {
			current.dead = true
			current = stack.pop();
		
			}
		
			if(current.i == cols-1 && current.j == rows-1  && !uni){
			uni = true
			but = createButton('play')
			but.style("border:none")
			but.size(400,100)
			but.position(10,450)
			but.mousePressed(play);
			}
		}
	}
}