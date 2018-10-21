import TweenLite from 'gsap'
import Barba from 'barba.js'

const DEFAULT_OPT = {
  timing: 1000
}

class TkyTransition {
  constructor(option) {
    this.PAGE = document.querySelector('.wrapper');
    this.OVERLAY = document.querySelector('.overlay');

    this.opt = Object.assign(DEFAULT_OPT, option);
  }

  valid() {
    return true;
  }

  get() {
    const _this = this;
    const TIMING = this.opt.timing / 1000;

    return Barba.BaseTransition.extend({
      start: function() {
        TweenLite.set(_this.OVERLAY, {
          visibility: 'visible'
        });

        TweenLite.to(_this.PAGE, TIMING, {
          y: '-30vh'
        })

        TweenLite.to(_this.OVERLAY, TIMING, {
          delay: 0,
          esae: Sine.easeIn,
          y: '-100vh',
          onComplete: () => this.finish()
        })
      },
      finish: function() {
        TweenLite.set(this.oldContainer, { visibility: 'hidden' })

        TweenLite.set(_this.PAGE, {
          y: '30vh'
        })

        this.newContainerLoading.then(() => {
          TweenLite.set(this.newContainer, { visibility: 'visible' })

          TweenLite.to(_this.PAGE, TIMING, {
            y: '0',
            ease: Sine.easeOut
          })

          TweenLite.to(_this.OVERLAY, TIMING, {
            delay: 0,
            esae: Sine.easeOut,
            y: '-200vh',
            onComplete: () => {
              this.done()

              TweenLite.set(_this.OVERLAY, {
                y: '0',
                visibility: 'hidden'
              });
            }
          })
        });
      },
    });
  }
}

let TkyTransitionInstance = new TkyTransition();
export default TkyTransitionInstance
