function pix(type_,x,y){
	this.type = type_ 
	/*
	0 = vide
	1 = mur
	2 = monstre
	3 = chest
	4 = exit
	5 = joueur
	6 = bomb
	*/
	this.px = x
	this.py = y
	this.id = -1

	this.show = function(){
		strokeWeight(2)
		switch(this.type){
			case 0:
			stroke(255)
			var xx = (longs * this.px) + (longs/2)
			var yy = (longs * (this.py+1)) - (longs/4)
			line(xx-1,yy,xx+1,yy)
			break

			case 1:
			stroke(200)
			var xx = (longs * this.px)
			var yy = (longs * (this.py))
			var t = longs/3
			line(xx+t,yy+2,xx+t,yy+longs-2)
			line(xx+t*2,yy+2,xx+t*2,yy+longs-2)

			line(xx+2,yy+t,xx+longs-2,yy+t)
			line(xx+2,yy+t*2,xx+longs-2,yy+t*2)
			break

			case 2:
			stroke(200,0,0)
			var xx = (longs * this.px)
			var yy = (longs * (this.py))
			var t = longs/4
			line(xx+t,yy+t*3,xx+t*3,yy+t)
			line(xx+t,yy+t,xx+t,yy+t)
			line(xx+t*3,yy+t*3,xx+t*3,yy+t*3)
			break

			case 3:
			stroke(179, 131, 2)
			var xx = (longs * this.px)
			var yy = (longs * (this.py))
			var t = longs/6

			line(xx+t*2,yy+t,xx+t*2,yy+t*5)
			line(xx+t*2,yy+t*3,xx+t*4,yy+t*3)
			line(xx+t*4,yy+t,xx+t*4,yy+t*4)
			break

			case 4:
			stroke(57, 184, 204)
			var xx = (longs * this.px)
			var yy = (longs * (this.py))
			var t = longs/6

			line(xx+t,yy+t*2,xx+t*5,yy+t*2)
			line(xx+t*2,yy+t*2,xx+t*2,yy+t*6-2)
			line(xx+t*4,yy+t*2,xx+t*4,yy+t*6-2)
			line(xx+t*4,yy+t*6-2,xx+t*5,yy+t*6-2)
			break

			case 5:
			stroke(200,200,0)
			var xx = (longs * this.px)
			var yy = (longs * (this.py))
			var t = longs/8

			line(xx+t*3,yy+t*3,xx+t*5,yy+t*3)
			line(xx+t*3,yy+t*5,xx+t*7,yy+t*5)

			line(xx+t*3,yy+t*3,xx+t*3,yy+t*5)
			line(xx+t*5,yy+t*3,xx+t*5,yy+t*5)

			line(xx+t*7,yy+t*1,xx+t*7,yy+t*5)
			line(xx+t*7,yy+t*1,xx+t*1,yy+t*1)

			line(xx+t*1,yy+t*1,xx+t*1,yy+t*7)
			line(xx+t*1,yy+t*7,xx+t*7,yy+t*7)

			break

			case 6:
			stroke(200,0,200)
			var xx = (longs * this.px)
			var yy = (longs * (this.py))
			var t = longs/4

			line(xx+2*t,yy+t,xx+2*t,yy+3*t)
			line(xx+t,yy+2*t,xx+3*t,yy+2*t)
			break

		}
	}
}