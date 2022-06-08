"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
var routes_1 = require("./routes/routes");
typeorm_1.createConnection().then(function (db) {
    //we have basically define the cors policies, you can do this the other way too;
    // app.use(cors({
    //     origin: ['http://localhost:3000','http://localhost:9090','http://localhost:4200']
    // }))
    //middleware that will parse the incoming json requests
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
        // define the settings of the below headers
        // res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
        next();
    });
    app.use(express.json());
    //we can get the company table using this
    // const productRepository = db.getRepository(Stocks);
    app.use('/api', routes_1.default);
    app.use('/', function (req, res, send) {
        res.status(200).json({ 'message': 'this is working' });
    });
    app.listen(8000);
});
var app = express();
