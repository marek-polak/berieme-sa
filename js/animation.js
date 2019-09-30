/*jshint esversion: 6 */
(function() {

  const controller = new ScrollMagic.Controller();


function pathPrepare ($el) {
  var lineLength = $el[0].getTotalLength();
  $el.css("stroke-dasharray", lineLength);
  $el.css("stroke-dashoffset", lineLength);
  $el.css("fill-opacity", 0);
}

var $line = $("path#path63");

// prepare SVG
pathPrepare($line);



// ========================
const randomDelay = (minimum, maximum) => {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};



 const sunTween = new TimelineLite()
  .to('.sun', 4, {rotation:360, repeat: -1, repeatDelay: randomDelay(0.1,2)});



const scrollInAnim = new TimelineMax()
        .add([
            TweenMax.to('.bride', 1.2, { alpha: 1 }),
            TweenMax.to('.groom', 1.2, { alpha: 1 }),
            TweenMax.to('.bride', 4, { x: (window.innerWidth/2)}),
            TweenMax.to('.groom', 4, { x: (-window.innerWidth/2)}),
            TweenMax.to('.sun', 4, { y: (window.innerHeight/6), ease: Elastic.easeInOut})
        ])


        // switching images
        .to('.newlyweds', 1, {rotationY:180}, '+=3') 
        .fromTo('#fig1', 0.3, {alpha: 1, rotationY:-180}, { rotationY:0 }).to('#fig1', 1, {rotationY:180}, '+=3')
        .fromTo('#fig2', 0.3, {alpha: 1, rotationY:-180}, { rotationY:0}).to('#fig2', 1, {rotationY:180}, '+=3')
        .fromTo('#fig3', 0.3, {alpha: 1, rotationY:-180}, { rotationY:0}).to('#fig3', 1, {rotationY:180}, '+=3')
        .fromTo('#fig4', 0.3, {alpha: 1, rotationY:-180}, { rotationY:0}).to('#fig4', 1, {rotationY:180}, '+=3')
        .fromTo('#fig5', 0.3, {alpha: 1, rotationY:-180},  { rotationY:0})

      
        .set('.church-wrapper', {css:{transformPerspective:200, perspectiveOrigin:'50% 100%', transformStyle:"preserve-3d"}})
        
        // trees
        .add([
          //TweenMax.to('.sun', 4, {rotation:360, repeat: 4, repeatDelay: randomDelay(1,4)}),
          TweenMax.from('.tree-left', 2, { y: -window.innerHeight, ease: Elastic.easeInOut}),
          TweenMax.from('.tree-upper-left', 2, { y: -window.innerHeight, ease: Elastic.easeInOut}),
          TweenMax.from('.tree-right', 2, { y: -window.innerHeight, ease: Elastic.easeInOut}),
          TweenMax.from('.church-wrapper', 2, {css:{rotationX:-90, z:100}, ease:Power2.easeOut}),
          TweenMax.to($line, 3, {strokeDashoffset: 0, ease:Linear.easeNone})
        ]).to($line, 3, {fillOpacity: 1})


        
        
        
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