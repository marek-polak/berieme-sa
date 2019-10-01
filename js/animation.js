/*jshint esversion: 6 */
(function() {

  const controller = new ScrollMagic.Controller();


function pathPrepare ($el) {
  var lineLength = $el[0].getTotalLength();
  $el.css("stroke-dasharray", lineLength);
  $el.css("stroke-dashoffset", lineLength);
  $el.css("fill-opacity", 0);
}


var $container = $('.animation');
var $line = $("path#path63");

// prepare SVG
pathPrepare($line);



// ========================
const randomDelay = (minimum, maximum) => {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};



 const sunTween = new TimelineLite()
  .to('.sun', 4, {rotation:360, repeat: -1, repeatDelay: randomDelay(0.1,2)});

 var $path_width = $container.width()*0.44;
 var $ribbon_width = $container.width()*0.6;


const scrollInAnim = new TimelineMax()
        //initial setup
        .set('.church-wrapper', {css:{transformPerspective:200, perspectiveOrigin:'50% 100%', transformStyle:"preserve-3d"}})
        .set('.sun', {top: -$('.sun').height()})
        .set('.fig', {left: (($container.width()/2) - ($('.fig').width()/2)), bottom: -($container.height()*0.10)})
        .set('.path-wrapper', {width: $path_width ,left: (($container.width()/2) - ($path_width/3)), bottom: 0})
        .set('.church-wrapper', {bottom: ($container.width()/6)})
        .set('.tree-right', {bottom: ($container.width()/7)})
        .set('.tree-left', {bottom: ($container.width()/7)})
        .set('.tree-upper-left', {bottom: ($container.width()/4)})
        .set('.ribbon', {width: $ribbon_width, left: (($container.width()/2) - ($ribbon_width/2)), bottom: ($container.height()/2.3), alpha:0})
        

        // groom meets bride
        .add([
            TweenMax.to('.bride', 1.2, { alpha: 1 }),
            TweenMax.to('.groom', 1.2, { alpha: 1 }),
            TweenMax.to('.bride', 3, { x: ($container.width()/2)}),
            TweenMax.to('.groom', 3, { x: -($container.width()/2)}),
            TweenMax.to('.sun', 4, { y: ($container.height()/4), ease: Elastic.easeInOut})
        ])

        // switching images
        .to('.newlyweds', 1, {rotationY:180}, '+=1') 
        .fromTo('#fig1', 0.3, {alpha: 1, rotationY:-180}, { rotationY:0 }).to('#fig1', 1, {rotationY:180}, '+=2')
        .fromTo('#fig2', 0.3, {alpha: 1, rotationY:-180}, { rotationY:0}).to('#fig2', 1, {rotationY:180}, '+=2')
        .fromTo('#fig3', 0.3, {alpha: 1, rotationY:-180}, { rotationY:0}).to('#fig3', 1, {rotationY:180}, '+=2')
        .fromTo('#fig4', 0.3, {alpha: 1, rotationY:-180}, { rotationY:0}).to('#fig4', 1, {rotationY:180}, '+=2')
        .fromTo('#fig5', 0.3, {alpha: 1, rotationY:-180},  { rotationY:0})

        // trees & church with path
        .add([
          TweenMax.from('.tree-left', 2, { y: -window.innerHeight, ease: Elastic.easeInOut}),
          TweenMax.from('.tree-upper-left', 2, { y: -window.innerHeight, ease: Elastic.easeInOut}),
          TweenMax.from('.tree-right', 2, { y: -window.innerHeight, ease: Elastic.easeInOut}),
          TweenMax.from('.church-wrapper', 2, {css:{rotationX:-90, z:100}, ease:Power2.easeOut}),
          TweenMax.to($line, 2, {strokeDashoffset: 0, ease:Linear.easeNone})
        ]).to($line, 1, {fillOpacity: 1}, '-=0.5')

        .to('.ribbon', 1.2, { alpha: 1 }, '-=1')
        .to('.ribbon', 3, { z: 50 })

        
        ;

const sceneBride = new ScrollMagic.Scene({
  triggerElement: '.animation',
  duration: 15000,
  triggerHook: 0
})
.setTween(scrollInAnim) 
.setPin('.animation')
.addIndicators({name: "1 - add a class"}) // add indicators (requires plugin)
.addTo(controller);


}());