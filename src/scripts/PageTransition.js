import Barba from 'barba.js'
import TkyTransition from './transition/TkyTransition'

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
      this._loadController(newStatus.namespace)
    });

    Barba.Dispatcher.on('initStateChange', () => {
      this._destroyController();
    });

    Barba.Dispatcher.on('transitionCompleted', (newStatus = {}, oldStatus = {}) => {
      this._setPageClass(newStatus.namespace, oldStatus.namespace);
    });
  }

  _loadController(controllerName) {
    if (controllerName == 'homepage') {
      import(/* webpackChunkName: "HomepageController" */ './controller/HomepageController').then(Controller => this._setController(Controller));
    }

    if (controllerName == 'page') {
      import(/* webpackChunkName: "PageController" */ './controller/PageController').then(Controller => this._setController(Controller));
    }
  }

  _setController(Controller) {
    this.activeController = new Controller.default();
  }

  _destroyController() {
    if (this.activeController && this.activeController.destroy) {
      this.activeController.destroy();
    }
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
