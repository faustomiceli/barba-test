import Barba from 'barba.js'
import TkyTransition from './transition/TkyTransition'

class PageTransition {
  constructor() {
    this.init();
  }

  init() {
    Barba.Pjax.start();
    Barba.Prefetch.init();

    Barba.Pjax.getTransition = () => this._defineTransition();
  }

  _defineTransition() {
    if (TkyTransition.valid()) {
      return TkyTransition.get();
    }
  }
}

export default PageTransition
