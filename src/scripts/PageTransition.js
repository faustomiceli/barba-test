import Barba from 'barba.js'
import TkyTransition from './transition/TkyTransition'

class PageTransition {
  constructor() {
    this.bindEvents();
    this.init();
  }

  init() {
    Barba.Pjax.start();
    Barba.Prefetch.init();

    Barba.Pjax.getTransition = () => this._defineTransition();
  }
  
  bindEvents() {
    Barba.Dispatcher.on('newPageReady', (newStatus, oldStatus, container) => {
      this._loadController(newStatus.namespace)
    });
  }

  async _loadController(controllerName) {
    if (controllerName == 'homepage') {
      new (await import('./controller/HomepageController')).default();
    }
  }

  _defineTransition() {
    if (TkyTransition.valid()) {
      return TkyTransition.get();
    }
  }
}

export default PageTransition
