import Barba from 'barba.js'
import TkyTransition from './pagetransition/TkyTransition'

class PageTransition {
  constructor() {
    this.init();
  }

  init() {
    Barba.Pjax.start();
    Barba.Pjax.getTransition = () => this._defineTransition();
  }

  _defineTransition() {
    return TkyTransition.get();
  }
}

export default PageTransition
