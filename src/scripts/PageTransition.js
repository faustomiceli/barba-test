import Barba from 'barba.js'
import TkyTransition from './transition/TkyTransition'
import ControllerManager from './ControllerManager'

const DEFAULT_OPT = {
  pageClassPrefix: 'p-'
}

class PageTransition {
  constructor(option) {
    this.OPT = {
      ...DEFAULT_OPT,
      option
    };

    this.bindEvents();
    this.init();
  }

  init() {
    Barba.Pjax.start();
    Barba.Prefetch.init();

    Barba.Pjax.getTransition = () => this._defineTransition();
  }

  bindEvents() {
    Barba.Dispatcher.on('newPageReady', (newStatus) => {
      ControllerManager.loadController(newStatus.namespace)
    });

    Barba.Dispatcher.on('initStateChange', () => {
      ControllerManager.destroyController();
    });

    Barba.Dispatcher.on('transitionCompleted', (newStatus = {}, oldStatus = {}) => {
      this._setPageClass(newStatus.namespace, oldStatus.namespace);
    });
  }

  _setPageClass(newClass = '', oldClass = '') {
    document.documentElement.classList.remove(`${this.OPT.pageClassPrefix}${oldClass}`);
    document.documentElement.classList.add(`${this.OPT.pageClassPrefix}${newClass}`);
  }

  _defineTransition() {
    if (TkyTransition.valid()) {
      return TkyTransition.get();
    }
  }
}

export default PageTransition
