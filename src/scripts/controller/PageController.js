import '../../styles/page.scss';

class PageController {
    constructor() {
        console.log('page instance');
    }

    handleEvents() {
        console.log('page init events');
    }

    destroy() {
        console.log('destroy page');
    }
}

export default PageController
