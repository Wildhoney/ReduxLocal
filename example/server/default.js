(function($process) {

    "use strict";

    const express = require('express');
    const app = express();
    const server = require('http').createServer(app);

    app.use(express.static(__dirname + '/..'));
    server.listen($process.env.PORT || 5000);

})(process);
