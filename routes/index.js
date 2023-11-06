const trimRequest = require('trim-request');

class Routes {
    constructor(app) {
        this.app = app;
    }

    /* creating app Routes starts */
    appRoutes() {
        this.app.use('/book', trimRequest.all, require("./book"));

    }
    

    routesConfig() {
        this.appRoutes();
    }
}

module.exports = Routes;