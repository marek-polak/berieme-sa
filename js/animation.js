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

// svg strokes
var $line = $("path#path63");
var $background_1 = $("path#svg_2");
var $background_2 = $("path#svg_4");
var $background_3 = $("path#svg_3");

// prepare SVG
pathPrepare($line);
pathPrepare($background_1);
pathPrepare($background_2);
pathPrepare($background_3);



// ========================
const randomDelay = (minimum, maximum) => {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};



 const sunTween = new TimelineLite()
  .to('.sun', 4, {rotation:360, repeat: -1, repeatDelay: randomDelay(0.1,2)});

 var $path_width = $container.width()*0.44;
 var $ribbon_width = $('.ribbon').width();


const scrollInAnim = new TimelineMax()
        //initial setup
        .set('.church-wrapper', {css:{transformPerspective:200, perspectiveOrigin:'50% 100%', transformStyle:"preserve-3d"}})
        .set('.sun', {top: -$('.sun').height(), visibility: 'visible'})
        .set('.fig', {left: (($container.width()/2) - ($('.fig').width()/2)), bottom: -($container.height()*0.10)})
        .set('.path-wrapper', {width: $path_width ,left: (($container.width()/2) - ($path_width/3)), bottom: 0})
        .set('.church-wrapper', {bottom: ($container.width()/6)})
        .set('.tree-right', {bottom: ($container.width()/6)})
        .set('.tree-left', {bottom: ($container.width()/6)})
        .set('.tree-upper-left', {bottom: ($container.width()/4)})
        .set('.ribbon', {visibility: 'visible', width: $ribbon_width, left: (($container.width()/2) - ($ribbon_width/2)), bottom: ($container.height()/1.9), alpha:0})

        //background comes to life
        .add([
          TweenMax.to($background_1, 4, {fillOpacity: 1}),
          TweenMax.to($background_2, 3, {fillOpacity: 1}),
          TweenMax.to($background_3, 0.6, {fillOpacity: 1}),
        ])

        // groom meets bride
        .add([
            TweenMax.to('.bride', 1.2, { alpha: 1 }),
            TweenMax.to('.groom', 1.2, { alpha: 1 }),
            TweenMax.to('.bride', 3, { x: ($container.width()/2-10)}),
            TweenMax.to('.groom', 3, { x: -($container.width()/2-10)}),
            TweenMax.to('.sun', 4, { y: ($('.sun').height()+14), ease: Elastic.easeInOut})
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
          TweenMax.from('.tree-left', 2, { y: -window.innerHeight-40, ease: Elastic.easeInOut}),
          TweenMax.from('.tree-upper-left', 2, { y: -window.innerHeight, ease: Elastic.easeInOut}),
          TweenMax.from('.tree-right', 2, { y: -window.innerHeight-20, ease: Elastic.easeInOut}),
          TweenMax.from('.church-wrapper', 2, {css:{rotationX:-90, z:100}, ease:Power2.easeOut}),
          TweenMax.to($line, 2, {strokeDashoffset: 0, ease:Linear.easeNone})
        ]).to($line, 1, {fillOpacity: 1}, '-=0.5')

        .to('.ribbon', 1.2, { alpha: 1 }, '-=1')
        .to('.ribbon', 3, { z: 50 })

        
        ;

const basicInfoAnim = new TimelineMax()
    //initial setup
    .set('.invite', {alpha: 0})
    .set('.reveal__title__when', {alpha: 0})
    .set('.reveal__date', {alpha: 0})
    .set('.reveal__time', {alpha: 0})
    .set('.reveal__title__where', {alpha: 0})
    .set('.reveal__place', {alpha: 0})
    
    //make elements visible on scroll
    .to('.invite', 1.2, { alpha: 1 }, '+=1')
    .to('.reveal__title__when', 0.6, { alpha: 1 }, '+=1')
    .to('.reveal__date', 0.8, { alpha: 1 }, '-=0.5')
    .to('.reveal__time', 0.8, { alpha: 1 }, '-=0.5')
    .to('.reveal__title__where', 0.6, { alpha: 1 }, '+=1')
    .to('.reveal__place', 0.8, { alpha: 1 }, '-=0.5')
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

// scene save-the-date
/* var scene = new ScrollMagic.Scene({triggerElement: ".save-the-date", duration: 300})
.setPin("#fig5-sdd")
.addIndicators({name: "1 (duration: 300)"}) // add indicators (requires plugin)
.addTo(controller); */

/* ScrollMagic.Scene({
  triggerElement: revealElements[i], // y value not modified, so we can use element as trigger as well
  offset: 50,												 // start a little later
  triggerHook: 0.9,
})
.setClassToggle(revealElements[i], "visible") // add class toggle
.addIndicators({name: "digit " + (i+1) }) // add indicators (requires plugin)
.addTo(controller); */


const sceneInfo = new ScrollMagic.Scene({
  triggerElement: '.basic-info',
  duration: 3400,
  offset: 50,
  triggerHook: 0
  
  //reverse: false
})
.setTween(basicInfoAnim) 
.setPin('.basic-info')
.addIndicators({name: "1 - basic-info"}) // add indicators (requires plugin)
.addTo(controller);


}());