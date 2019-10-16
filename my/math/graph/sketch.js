var values = [];
var nbr = []
var longs = 0
var infs, but;
var mins, maxs;
var vals = 0;
var valst = [];
var per = 0
var perl

function setup() {
  noCanvas();
  perl = createP(per)

  infs = createInput('500')
  infs2 = createInput('1000')
  but = createButton('update')
  but.mousePressed(upd)
  
  upd()

}

function draw() {

}

function lancee(nbr) {
  var t = 0
  for (let i = 0; i < nbr; i++) {
    ii = random()
    if (ii < 0.5) {
      t++
    }
  }
  return t / nbr
}

function upd(){
  longs = int(infs2.value())
  longg = int(infs.value())
  
  nbr = []
  values = []
  mins = []
  maxs = []
  
  vals = 0
  valst = []
  
  ttv = 0
  
  for(i = 0; i < longs; i ++){
    
    nbr.push(i)
    var tt = lancee(longg)
    values.push(tt)
    vals += tt
    valst.push(vals / (i+1))
    
    
    var ttm = 0.5 - (1/sqrt(longg))
    var ttma = 0.5 + (1/sqrt(longg))
    if (tt > ttm && tt < ttma){
      ttv ++
    }
    mins.push(ttm)
    maxs.push(ttma)
  }
  per = (ttv/longs)*100
  
  perl.html(per + "%")
  update();
}

function update() {
  var trace1 = {
    x: nbr,
    y: values,
    mode: 'markers',
    type: 'scatter',
    name: 'valeurs',
    marker: {
      size: 10,
      color: 'rgb(200, 0, 0)',
    }
  };

  var trace2 = {
    x: nbr,
    y: maxs,
    mode: 'lines',
    type: 'scatter',
    name: 'max',
    marker: {color: 'rgb(0, 0, 200)'}
  };

  var trace3 = {
    x: nbr,
    y: mins,
    mode: 'lines',
    type: 'scatter',
    name: 'min',
    marker: {color: 'rgb(0, 200, 0)'}
  };
  
  var trace4 = {
    x: nbr,
    y: valst,
    mode: 'lines',
    type: 'scatter',
    name: 'environs',
    marker: {color: 'rgb(255, 131, 0)'}
  };

  var data = [trace1, trace2, trace3, trace4];

  Plotly.newPlot('graph', data);

}
