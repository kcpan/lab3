var gridSize = 20;
var grid = [];
var gridCol = [];
var gridVal = [];
var colors = ['#ff5d5d', '#fac44c','#fffe7d', '#9fff80', '#93ffff', '#656bfc', '#e770ff'];
var numColors = colors.length;

var windowHeight = $(window).innerHeight();
var windowWidth = $(window).innerWidth();
var squareSize = Math.floor(windowHeight/gridSize);

$(document).ready(function() {

  $(this).addClass('animate');

  var animTime = 1, // time for the animation in seconds
      hueChange = 6, // the hue change from one span element to the next
      prefixes = ["", "-webkit-", "-moz-", "-o-"],
      numPrefixes = prefixes.length;

  $('.unicorn').find('span').each(function (i) {
      for (var j = 0; j < numPrefixes; j++) {
          $(this).css(prefixes[j] + 'animation-delay', (animTime * ((i * hueChange) % 360) / 360) - animTime + 's');
      }
  });

  for (i = 0; i < gridSize * gridSize; i++) {
    //var square = $('<div class="square">'+Math.floor(i/gridSize)+"|"+i%gridSize +'</div>');
    var square = $('<div class="square">'+ 0 +'</div>');
    $('.container').append(square);
    square.data("index", i);
    grid.push(square);
    grid[i].css('background-size',''+squareSize+'px 0px' );
    gridCol.push(i % numColors);
  }

  loadGridFirst();

  var intervalID = window.setInterval(function(){
    // console.log("hello nobo");
    loadGrid();},10000);

  function setSize() {
    windowHeight = $(window).innerHeight();
    windowWidth = $(window).innerWidth();
    squareSize = Math.floor(windowHeight/gridSize);
    $('.container').css('width', Math.floor(windowHeight/gridSize)*gridSize);
    $('.container').css('height', Math.floor(windowHeight/gridSize)*gridSize);
    $('.container').css('margin-top',((windowHeight - Math.floor(windowHeight/gridSize)*gridSize)/2));
    $('.container').css('margin-bottom',((windowHeight - Math.floor(windowHeight/gridSize)*gridSize)/2));
    $('.square').css('width', Math.floor(windowHeight/gridSize));
    $('.square').css('height', Math.floor(windowHeight/gridSize));
    // $('.start').css('height', windowHeight);
    // $('.start').css('width', windowWidth);
  }

  setSize();

  $(window).resize(function() {
    setSize();
    drawShrooms();
  });

  var $squareClicked;
  var pop = $('.pop-up-wrapper');

  function hidePopUp(){
    $(pop).addClass('vishidden');
    pop.one('transitionend', function(e){
      pop.addClass('hidden');
    });
  }

  function showPopUp(){
    pop.removeClass('hidden');
    setTimeout(function() {
      pop.removeClass('vishidden');
    }, 20);
  }

  $('.square').click(function() {
    // if (pop.hasClass('hidden')) {
    //   showPopUp();
    // }

    var ind = $(this).data("index");

    $(this).addClass('shadow');

    if ($(this).text() === '0') {
      setGrid(ind,1,$(this));
    } else {
      setGrid(ind,0,$(this));
    }
    // hidePopUp();
  });

  $(pop).click(function() {
    if (!(pop.find(".pop-up:hover").length)) {
      hidePopUp();
    }
  });

  $('.yes').click(function() {

    var ind = $squareClicked.data("index");

    if ($squareClicked.text() === '0') {
      setGrid(ind,1);
    } else {
      setGrid(ind,0);
    }
    hidePopUp();
  });

  // Cycle speed
  var speed = 200;
  window.setInterval(function() {
    for (i = 0; i < grid.length; i++) {
      if(grid[i].hasClass('shadow'))
      {
        grid[i].css('background-color', '#ffffff');
      }
      else {
        grid[i].css('background-color', colors[gridCol[i]]);
      }
      gridCol[i] = (gridCol[i] + 1) % numColors;
    }
  }, speed);
});

function setGrid(index, val, square){
  $.post("https://script.google.com/macros/s/AKfycbyb0SW3YfRewIm2LmN9dM8iGElEa2UhTFmOws2yQxBg4AD0-AM/exec",{ "index": index, "val":val },function(data){
    parseGrid(data);
    drawShrooms();
    square.removeClass('shadow');
  });
}

function loadGrid(){
  $.get("https://script.google.com/macros/s/AKfycbyb0SW3YfRewIm2LmN9dM8iGElEa2UhTFmOws2yQxBg4AD0-AM/exec", function(data){
    parseGrid(data);
    drawShrooms();
  });
}


function loadGridFirst(){
  $.get("https://script.google.com/macros/s/AKfycbyb0SW3YfRewIm2LmN9dM8iGElEa2UhTFmOws2yQxBg4AD0-AM/exec", function(data){
    parseGrid(data);
    drawShrooms();

    $('.whole').addClass('vishidden');
    $('.whole').one('transitionend', function(e){
      $('.whole').addClass('hidden');
    });

  });
}

function parseGrid(data){
  gridVal = JSON.parse(data);
  for(var i = 0; i < gridSize; i++)
  {
    for(var j = 0; j < gridSize; j++)
    {
      grid[(i*gridSize + j)].text(""+gridVal[i][j]);
    }
  }
}

function drawShrooms(){
  for(var i = 0; i < gridSize *gridSize ; i++)
  {
    var shroomNum = gridVal[Math.floor(i/gridSize)][i%gridSize];
    if (shroomNum !== 0) {
      grid[i].css('background-image', 'url(img/shroom'+shroomNum+'.png)');
      grid[i].css('background-size',""+squareSize+"px " +squareSize+"px");
    }else {
      grid[i].css('background-size', '0px 0px');
    }
  }
}
