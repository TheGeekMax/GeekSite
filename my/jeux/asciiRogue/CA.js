function CA(x_,y_){
	this.cells = []

	for (let i = 0; i < x_*y_; i++) {
		this.cells.push(0)
	}

	this.x = x_
	this.y = y_
	this.type = []
	this.rule = []

	//ajout de base
	this.type.push("air")

	this.print = function(){
		console.log("Types :")
		console.log(this.type)
		console.log("Rules :")
		console.log(this.rule)
	}

	this.addType = function(name){
		var i = this.type.length
		this.type.push(name)
		return i
	}

	this.addRule = function(from,to,test,ru){
		var i = this.rule.length
		this.rule[i] = []
		this.rule[i][0] = from
		this.rule[i][1] = to
		this.rule[i][2] = ru
		this.rule[i][3] = test

		return i
	}

	this.step = function(border){
		var news = []
		var tbVer = []

		for (let i = 0; i < this.x; i++) {
			news[i] = []
			for (var j = 0; j < this.y; j++) {
				news[i][j] = -2
			}
		}

		for (let i = 0; i < this.x+2; i++) {
			tbVer[i] = []
			for (var j = 0; j < this.y+2; j++) {
				if(i > 0 && i < this.y+1 && j > 0 && j < this.x+1){
					tbVer[i][j] = this.cells[(i-1)+(j-1)*this.y]
				}else{
					tbVer[i][j] = border
				}
			}
		}

		for(let x_ = 1 ; x_ <= this.x; x_++){
			for(let y_ = 1 ; y_ <= this.y; y_++){
				// var ind = (x_-1) + (y_-1) * this.y
				//verif pr chaque regles
				for(var i = 0 ; i < this.rule.length; i++){

					//verif si rule.from est le meme que cells
					if(this.rule[i][0] == tbVer[x_][y_] && news[x_-1][y_-1] == -2){
						var voisins = 0

						if(tbVer[x_+1][y_] == this.rule[i][3]){
							voisins ++
						}
						if(tbVer[x_+1][y_+1] == this.rule[i][3]){
							voisins ++
						}
						if(tbVer[x_][y_+1] == this.rule[i][3]){
							voisins ++
						}
						if(tbVer[x_-1][y_+1] == this.rule[i][3]){
							voisins ++
						}
						if(tbVer[x_-1][y_] == this.rule[i][3]){
							voisins ++
						}
						if(tbVer[x_-1][y_-1] == this.rule[i][3]){
							voisins ++
						}
						if(tbVer[x_][y_-1] == this.rule[i][3]){
							voisins ++
						}
						if(tbVer[x_+1][y_-1] == this.rule[i][3]){
							voisins ++
						}
						if(this.rule[i][2][voisins] == 1){
							news[x_-1][y_-1] = this.rule[i][1]
						}else{
							news[x_-1][y_-1] = this.rule[i][0]
						}

					}
				}
				if(news[x_-1][y_-1] == -2){
					news[x_-1][y_-1] = 0
				}
			}
		}
		var ends = []
		for (let i = 0; i < news.length; i++) {
			for (var j = 0; j < news[i].length; j++) {
				ends[i+j*this.y] = news[i][j]
			}
		}
		this.cells = ends
	}

	this.rand = function(cel, per){
		for(let i = 0 ; i < this.cells.length; i++){
			if(this.cells[i] == 0 && random() < per/100){
				this.cells[i] = cel
			}
		}
	}

	this.clear = function(cel){
		for(let i = 0 ; i < this.cells.length; i++){
			this.cells[i] = cel
		}
	}
}