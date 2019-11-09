function player(x_,y_,vie,dmg){
	this.x = x_
	this.y = y_
	this.id = x_ + y_ *x
	this.health = vie
	this.maxH = vie
	this.damage = dmg

	this.exp = 0
	this.maxE = 10
	this.level = 0

	this.Bradius = 3
	this.per = 0.5

	this.name = 'Player'

	this.upA = UP_ARROW
	this.downA = DOWN_ARROW
	this.leftA = LEFT_ARROW
	this.rightA = RIGHT_ARROW

	this.died = false

	all[this.x+this.y*y].type = 5

	this.levelup = function(){
		if(this.exp >= this.maxE){
			this.level ++

			this.exp -= this.maxE
			this.maxE = int(this.maxE *1.5)
			this.maxH += int(random()*2)+this.level/2
			this.health = this.maxH
			this.damage += int(random()*2)+this.level/2
		}
	}

	this.updateName = function(){
		$("#chgName").show()

		 $('#accepts').click(function() {
            $("#chgName").hide()
      	});
	}

	

	this.chgCoors = function(x_,y_){
		all[this.x+this.y*y].type = 0
		this.x = x_
		this.y = y_
		all[this.x+this.y*y].type = 5
	}

	this.move = function(key){
		if(this.health <= 0){
			this.died = true
		}
		if(!this.died){
			if(key == this.leftA){
				this.left()	
			}
			if(key == this.rightA){
				this.right()	
			}
			if(key == this.upA){
				this.up()
			}		
			if(key == this.downA){
				this.down()
			}
		}
	}

	this.right = function(){
		if(all[(this.x+1)+(this.y)*y].type == 3){
			all[(this.x+1)+(this.y)*y].type = 0
			pl.health = pl.maxH
			pl.exp += int(pl.maxH/5)

			if(random() > this.per){
				this.per /= 2
				this.Bradius ++
			}
		}

		if(all[(this.x+1)+(this.y)*y].type == 4){
		generate()
		}

		if(all[(this.x+1)+(this.y)*y].type == 0){
			all[(this.x)+(this.y)*y].type = 0
			all[(this.x+1)+(this.y)*y].type = 5
			this.x ++
		}
	}

	this.left = function(){
		if(all[(this.x-1)+(this.y)*y].type == 3){
		all[(this.x-1)+(this.y)*y].type = 0
		pl.health = pl.maxH
		pl.exp += int(pl.maxH/5)

			if(random() > this.per){
				this.per /= 2
				this.Bradius ++
			}
		}

		if(all[(this.x-1)+(this.y)*y].type == 4){
		generate()
		}

		if(all[(this.x-1)+(this.y)*y].type == 0){
			all[(this.x)+(this.y)*y].type = 0
			all[(this.x-1)+(this.y)*y].type = 5
			this.x --
		}
	}

	this.up = function(){
		if(all[(this.x)+(this.y-1)*y].type == 3){
		all[(this.x)+(this.y-1)*y].type = 0
		pl.health = pl.maxH
		pl.exp += int(pl.maxH/5)

			if(random() > this.per){
				this.per /= 2
				this.Bradius ++
			}
		}

		if(all[(this.x)+(this.y-1)*y].type == 4){
		generate()
		}

		if(all[(this.x)+(this.y-1)*y].type == 0){
			all[(this.x)+(this.y)*y].type = 0
			all[(this.x)+(this.y-1)*y].type = 5
			this.y --
		}
	}

	this.down = function(){
		if(all[(this.x)+(this.y+1)*y].type == 3){
		all[(this.x)+(this.y+1)*y].type = 0
		pl.health = pl.maxH
		pl.exp += int(pl.maxH/5)

			if(random() < this.per){
				this.per /= 2
				this.Bradius ++
			}
		}

		if(all[(this.x)+(this.y+1)*y].type == 4){
		generate()
		}

		if(all[(this.x)+(this.y+1)*y].type == 0){
			all[(this.x)+(this.y)*y].type = 0
			all[(this.x)+(this.y+1)*y].type = 5
			this.y ++
		}
	}
}