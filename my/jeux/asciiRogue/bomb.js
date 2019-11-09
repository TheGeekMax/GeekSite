function bomb(x_,y_,df,r){
	this.x = x_
	this.y = y_
	this.fuse = df
	this.ray = r

	all[this.x+this.y*y].type = 6

	this.defuse = function(){
		if(this.fuse > 1){
			this.fuse--
			return false
		}else{
			all[this.x+this.y*y].type = 0
			for(let xx = 0; xx < x; xx++){
				for(let yy = 0; yy < y; yy++){
					var len = sqrt(pow(this.x-xx,2)+pow(this.y-yy,2))
					var ind = xx + yy * y 

					if(len <= this.ray && all[ind].type == 1){
						all[ind].type = 0
					}else if(len <= this.ray && all[ind].type == 2){
						var Mmr = 0
						while(mr[Mmr].x != xx && mr[Mmr].y != yy){
							Mmr ++
						}
						mr[Mmr].health *= (map(len,1,this.ray,0.1,0.9)).toFixed(2)
					}
				}	
			}
			return true
		}
	}

}