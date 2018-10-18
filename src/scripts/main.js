import TweenLite from 'gsap';
import Barba from 'barba.js';
import '../styles/main.scss';

const PAGE = document.querySelector('.wrapper');
const OVERLAY = document.querySelector('.overlay');

Barba.Pjax.start();

var TkyAnimation = Barba.BaseTransition.extend({
  start: function() {
    this.ani('-100vh');
    //TweenLite.set(PAGE, { y: '0' })
    TweenLite.set(OVERLAY, { y: '0' });
    this.aniOverlay('-100vh', () => this.finish());

  },
  ani: function(yP) {
    TweenLite.to(PAGE, 2, {
      y: yP, ease: Sine.easeOut, autoAlpha: 1
    })
  },
  aniOverlay: function(yP, cb) {
    TweenLite.to(OVERLAY, 2, {
      delay: 0,
      y: yP, ease: Sine.easeOut, onComplete: cb
    })
  },
  finish: function() {
    TweenLite.set(this.oldContainer, { visibility: 'hidden' })
  
    TweenLite.set(PAGE, {
      y: '100vh', autoAlpha: 0
    })

    this.newContainerLoading.then(() => {
      TweenLite.set(this.newContainer, { visibility: 'visible' })
      this.ani('0');
      this.aniOverlay('-200vh', () => this.done());
    });
  }
});

Barba.Pjax.getTransition = function() {
  return TkyAnimation;
};

