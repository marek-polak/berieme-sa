/*jshint esversion: 6 */
(function() {
// const flightPath = {
//   curviness: 1.5,
//   autoRotate: true,
//   values: [
//     {x: (window.innerWidth/8), y: -20},
//     {x: (window.innerWidth/8)*2, y:10},
//     {x: (window.innerWidth/8)*3, y: 100},
//     {x: (window.innerWidth/8)*4, y: -100},
//     {x: (window.innerWidth/8)*3, y: -50},
//     {x: (window.innerWidth/8)*5, y: 100},
//     {x: (window.innerWidth/8)*7, y: 0},
//     {x: window.innerWidth + 150, y: 100}
//   ]
// };

// const tween = new TimelineLite();

// tween.add(
//   TweenLite.to('.paper-plane' , 3, {
//     bezier: flightPath,
//     ease: Power1.easeInOut
//   })
// );

 const controller = new ScrollMagic.Controller();
// const scenePlane = new ScrollMagic.Scene({
//   triggerElement: '.animation',
//   duration: 4500,
//   triggerHook: 0
// })
// .setTween(tween)
// .addIndicators()
// .setPin('.animation')
// .addTo(controller);


// ========================
const randomDelay = (minimum, maximum) => {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

//TweenLite.set(trans3DBoxes, {css:{transformPerspective:400, transformStyle:"preserve-3d"}}).to;


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
        
        // trees
        .add([
          TweenMax.to('.sun', 4, {rotation:360, repeat: 4, repeatDelay: randomDelay(1,4)}),
          TweenMax.from('.tree-left', 2, { y: -window.innerHeight, ease: Elastic.easeInOut}),
          TweenMax.from('.tree-upper-left', 2, { y: -window.innerHeight, ease: Elastic.easeInOut}),
          TweenMax.from('.tree-right', 2, { y: -window.innerHeight, ease: Elastic.easeInOut}),
          //TweenMax.to('.church-wrapper', 2, { y: (window.innerHeight/1.9)+30, ease: Elastic.easeInOut})
          //TweenMax.fromTo('.church-wrapper', 2, {css:{rotationX:90, z:-10}}, {css:{rotationX:-90, z:-10}, ease:Power2.easeOut})
        ])
        
        
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