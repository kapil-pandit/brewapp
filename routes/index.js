const trimRequest = require('trim-request');

class Routes {
    constructor(app) {
        this.app = app;
    }

    /* creating app Routes starts */
    appRoutes() {
        this.app.use('/user', trimRequest.all, require("./user"));
        this.app.use('/api/cart', trimRequest.all, require("./cart"));

    }
    

    routesConfig() {
        this.appRoutes();
    }
}

module.exports = Routes;