import TweenLite from 'gsap'
import Barba from 'barba.js'

const DEFAULT_OPT = {
  timing: 1000,
  overlayClassSelector: 'overlay',
  pageClassTransition: 'isTransition'
}

class TkyTransition {
  constructor() {
    this.OPT = {...DEFAULT_OPT};
    this.PAGE = document.querySelector('.wrapper');
    this.OVERLAY = this._createOverlay();
  }

  valid() {
    return true;
  }

  get(option) {
    this.OPT = {
      ...this.OPT,
      option
    };

    return this.startTransition();
  }

  startTransition() {
    const _this = this;
    const TIMING = this.OPT.timing / 1000;

    return Barba.BaseTransition.extend({
      start: function() {
        _this._transitionStarted();

        TweenLite.set(_this.OVERLAY, {
          visibility: 'visible'
        });

        TweenLite.to(_this.PAGE, TIMING, {
          y: '-30vh'
        });

        TweenLite.to(_this.OVERLAY, TIMING, {
          delay: 0,
          esae: Sine.easeIn,
          y: '-100vh',
          onComplete: () => this.finish()
        });
      },
      finish: function() {
        TweenLite.set(this.oldContainer, { visibility: 'hidden' });

        TweenLite.set(_this.PAGE, {
          y: '30vh'
        });

        Promise.all([this.newContainerLoading]).then(() => {
          this.done();
          TweenLite.set(this.newContainer, { visibility: 'visible' });

          TweenLite.to(_this.PAGE, TIMING, {
            y: '0',
            ease: Sine.easeOut
          });

          TweenLite.to(_this.OVERLAY, TIMING, {
            delay: 0,
            esae: Sine.easeOut,
            y: '-200vh',
            onComplete: () => {
              _this._transitionEndend();

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

  _transitionStarted() {
    document.documentElement.classList.add(this.OPT.pageClassTransition);
  }

  _transitionEndend() {
    document.documentElement.classList.remove(this.OPT.pageClassTransition);
  }

  _createOverlay() {
    let overlay = document.createElement('div');
    overlay.className = this.OPT.overlayClassSelector;
    document.body.appendChild(overlay);
    return overlay;
  }
}

let TkyTransitionInstance = new TkyTransition();
export default TkyTransitionInstance
