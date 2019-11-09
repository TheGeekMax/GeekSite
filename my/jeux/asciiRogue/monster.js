function monster(x_,y_,vie,dmg){
	this.x = x_
	this.y = y_
	this.id = x_ + y_ *x
	this.health = vie
	this.damage = dmg

	this.exp = int(vie/4)

	this.obj = $("#monsterL").append($("<p>").append("health : "+this.health+" damages : "+this.damage).attr('id', this.id));
	all[this.x+this.y*y].type = 2

	this.update = function(){
		$("#"+this.id).html("health : "+this.health+" damages : "+this.damage)
		// document.getElementById(this.id).setAttribute('title', 'health : '+this.health+'\ndamages : '+this.damage)
	}

	this.right = function(){
		if(all[(this.x+1)+(this.y)*y].type == 0){
			all[(this.x)+(this.y)*y].type = 0
			all[(this.x+1)+(this.y)*y].type = 2
			this.x ++
		}
	}

	this.left = function(){
		if(all[(this.x-1)+(this.y)*y].type == 0){
			all[(this.x)+(this.y)*y].type = 0
			all[(this.x-1)+(this.y)*y].type = 2
			this.x --
		}
	}

	this.up = function(){
		if(all[(this.x)+(this.y-1)*y].type == 0){
			all[(this.x)+(this.y)*y].type = 0
			all[(this.x)+(this.y-1)*y].type = 2
			this.y --
		}
	}

	this.down = function(){
		if(all[(this.x)+(this.y+1)*y].type == 0){
			all[(this.x)+(this.y)*y].type = 0
			all[(this.x)+(this.y+1)*y].type = 2
			this.y ++
		}
	}

	this.move = function(){

		dists = sqrt(pow((pl.x-this.x),2)+pow((pl.y-this.y),2))
		// print(dists)
		if(dists <= sqrt(2)+0.1){
			this.health -= int(random(pl.damage))
			pl.health -= int(random(this.damage))
		}
		if(dists <= 10){
			mx = pl.x-this.x
			my = pl.y-this.y
			an = atan(my/mx)
			if(mx < 0 && my < 0){
				this.left()
				this.up()
			}else if(mx > 0 && my < 0){
				this.right()
				this.up()
			}else if(mx > 0 && my > 0){
				this.right()
				this.down()
			}else if(mx < 0 && my > 0){
				this.left()
				this.down()
			}else if(mx == 0 && my < 0){
				this.up()
				this.up()
			}else if(mx == 0 && my > 0){
				this.down()
				this.down()
			}else if(my == 0 && mx < 0){
				this.left()
				this.left()
			}else if(my == 0 && mx > 0){
				this.right()
				this.right()
			}




		}
	}
}