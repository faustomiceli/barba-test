import TweenLite from 'gsap'
import Barba from 'barba.js'

const DEFAULT_OPT = {
  timing: 800
}

class TkyTransition {
  constructor(option) {
    this.PAGE = document.querySelector('.wrapper');
    this.OVERLAY = document.querySelector('.overlay');

    this.opt = Object.assign(DEFAULT_OPT, option);
  }

  get() {
    const _this = this;
    const TIMING = this.opt.timing / 1000;

    return Barba.BaseTransition.extend({
      start: function() {
        TweenLite.to(_this.PAGE, TIMING, {
          y: '-20vh',
          ease: Sine.easeOut,
          autoAlpha: 1
        })

        TweenLite.set(_this.OVERLAY, {
          y: '0'
        });

        TweenLite.to(_this.OVERLAY, TIMING, {
          delay: 0,
          y: '-100vh',
          ease: Sine.easeOut,
          onComplete: () => this.finish()
        })
      },
      finish: function() {
        TweenLite.set(this.oldContainer, { visibility: 'hidden' })

        TweenLite.set(_this.PAGE, {
          y: '20vh',
          autoAlpha: 0
        })

        this.newContainerLoading.then(() => {
          TweenLite.set(this.newContainer, { visibility: 'visible' })

          TweenLite.to(_this.PAGE, TIMING, {
            y: '0',
            ease: Sine.easeOut,
            autoAlpha: 1
          })

          TweenLite.to(_this.OVERLAY, TIMING, {
            delay: 0,
            y: '-200vh',
            ease: Sine.easeOut,
            onComplete: () => this.done()
          })
        });
      },
    });
  }
}

let TkyTransitionInstance = new TkyTransition();
export default TkyTransitionInstance
