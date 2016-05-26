$(document).ready(function(){
  $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 900, 'swing', function () {
          window.location.hash = target;
      });
  });
});

$(document).ready(function(){
  $( "#claude-container" ).hide().slideDown( "slow", function() {
    // Animation complete.
  });
});


$(document).ready(function(){
  $( "#name-title" ).hide().delay( 400 ).slideDown( "slow", function() {
    // Animation complete.
  });
});


$(document).ready(function(){
  $( "#hero-text" ).hide().delay( 800 ).slideDown( "slow", function() {
    // Animation complete.
  });
});

$(document).ready(function(){
    $( "#picture-text" ).hide().delay( 800 ).fadeTo( "slow", 1 );
});

// Code from http://codepen.io/stacigh/pen/Lxbdo

$(function(){
  // Variables
  var $window = $(window);
  var $nav = $('nav');
  var $next = $nav.next();
  var windowHeight = $window.height();
  // Find the value of 90% of the viewport height
  var ninetypercent = .9 * windowHeight;
  // navHeight could change, so let's get the height
  var navHeight = $nav.outerHeight(true);
  $window.on('resize', function(){
    
    // after a resize we need to make sure the values are still correct

    windowHeight = $(window).height();
    ninetypercent = .9 * windowHeight;
    navHeight = $nav.outerHeight(true);
  });

  // When the window is scrolled ninety percent or rresized, toggle the classes
  // Does not work in iOS 7 or below
  // Hasn't been tested in iOS 8
  $window.on('scroll resize', function(){

    // Store the document scroll function in a variable
    var y = $window.scrollTop() > ninetypercent;

    // If the document is scrolled 90%        
    // Add the "sticky" class
    $nav.toggleClass('sticky', y);
    var paddingTop = y ? navHeight : 0;
    
    // and make sure the next element gets the correct padding
    $next.css({
      paddingTop: paddingTop
    });

  });
  
}); // jQuery

// End code from http://codepen.io/stacigh/pen/Lxbdo




/////////////////////




//Based on the Scroller function from @sallar
var $content = $('.hero .content')
  , $blur    = $('.hero .overlay')
  , wHeight  = $(window).height();

$(window).on('resize', function(){
  wHeight = $(window).height();
});

window.requestAnimFrame = (function()
{
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function Scroller()
{
  this.latestKnownScrollY = 0;
  this.ticking            = false;
}

Scroller.prototype = {
 
  init: function() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
    $blur.css('background-image',$('header:first-of-type').css('background-image'));
  },


  onScroll: function() {
    this.latestKnownScrollY = window.scrollY;
    this.requestTick();
  },

  
  requestTick: function() {
    if( !this.ticking ) {
      window.requestAnimFrame(this.update.bind(this));
    }
    this.ticking = true;
  },

  update: function() {
    var currentScrollY = this.latestKnownScrollY;
    this.ticking       = false;
    
    
    var slowScroll = currentScrollY / 2
      , blurScroll = currentScrollY * 2
      , opaScroll = 1.4 - currentScrollY / 400;
   if(currentScrollY > wHeight)
     $('nav').css('position','fixed');
   else
     $('nav').css('position','absolute');
    
    $content.css({
      'transform'         : 'translateY(' + slowScroll + 'px)',
      '-moz-transform'    : 'translateY(' + slowScroll + 'px)',
      '-webkit-transform' : 'translateY(' + slowScroll + 'px)',
      'opacity' : opaScroll
    });
    
    $blur.css({
      'opacity' : blurScroll / wHeight
    });
  }
};


var scroller = new Scroller();  
scroller.init();

/// end of paralax code