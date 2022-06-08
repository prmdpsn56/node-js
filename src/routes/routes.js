"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Controllers = require("../controllers/controllers");
var stocksRouter = express_1.Router();
//making a stock entry for a company
stocksRouter.post('/stocks', Controllers.RegisterStock);
//sending the company stocks back
stocksRouter.get('/stocks/:companycode', Controllers.SendStocks);
//Delete all stocks of a company
stocksRouter.delete('/stocks/:companycode', Controllers.DeleteStock);
exports.default = stocksRouter;
