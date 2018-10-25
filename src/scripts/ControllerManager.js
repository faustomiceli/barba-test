import EventManager from './EventManager'

class ControllerManager {
  constructor() {

  }

  loadController(controllerName) {
    if (controllerName == 'homepage') {
      import(/* webpackChunkName: "HomepageController" */ './controller/HomepageController').then(Controller => this._setController(Controller));
      return;
    }

    if (controllerName == 'page') {
      import(/* webpackChunkName: "PageController" */ './controller/PageController').then(Controller => this._setController(Controller));
      return;
    }

    EventManager.emitEvent('ControllerLoaded');
  }

  _setController(Controller) {
    this.activeController = new Controller.default();
    EventManager.emitEvent('ControllerLoaded');
  }

  destroyController() {
    if (this.activeController && this.activeController.destroy) {
      this.activeController.destroy();
    }
  }
}

let ControllerManagerInstance = new ControllerManager()
export default ControllerManagerInstance
