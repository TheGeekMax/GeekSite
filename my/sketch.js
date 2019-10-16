var data = []

window.onload = function() {
  $.getJSON("https://raw.githubusercontent.com/TheGeekMax/WikiSite/master/progs/titles.json",function(datat){
    data.push(datat)
  
    $.getJSON("https://raw.githubusercontent.com/TheGeekMax/WikiSite/master/progs/games.json",function(datat){
      data.push(datat)
    
      $.getJSON("https://raw.githubusercontent.com/TheGeekMax/WikiSite/master/progs/tools.json",function(datat){
      data.push(datat)
      
        $.getJSON("https://raw.githubusercontent.com/TheGeekMax/WikiSite/master/progs/math.json",function(datat){
          data.push(datat)
          begin()
        })
      })
    })
  })
}

function begin(){
  console.log(data)
  //affichage des fichiers
  $("#body").append($("<div>").attr('id', "buttons"));
  for(let i = 1 ; i < data.length; i ++){
    $("#body").append($("<div>").attr('id', data[i][0].titre));
    $("#"+data[i][0].titre).append("<h1>"+ data[i][0].titre +" :</h1>");
    $("#buttons").append("<button id=\""+ data[i][0].titre +"1\">"+ data[i][0].titre +"</button>");

    $("#"+data[i][0].titre+"1").click(function(){
      affs(i)
    })

    for(let j = 0 ; j < data[0].title.length; j ++){

      if(testif(data[i],String(j))){
        $("#"+data[i][0].titre).append("<h5>"+ data[0].title[j] +" :</h5>");

        for(let k = 1 ; k < data[i].length; k ++){
          if(data[i][k].type == j)
          $("#"+data[i][0].titre).append("<a href = \"" + data[i][k].url + "\">"+ data[i][k].name +"<br></a>");
        } 

      }

    }   
  }

  affs(1)
}

function affs(ind){
  for (let i = 1; i < data.length; i++) {
    $("#"+data[i][0].titre).hide()
  }
  $("#"+data[ind][0].titre).show()
}

function testif(da,val){
  for(let i = 0 ; i < da.length; i++){
    if(da[i].type == val){
      return true;
    }
  }
  return false
}