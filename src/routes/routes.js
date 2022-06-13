"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Controllers = require("../controllers/controllers");
var stocksRouter = express_1.Router();
//making a stock entry for a company
// stocksRouter.post('/stocks',Controllers.RegisterStock);    
//filtered stocks
stocksRouter.get('/stocks/filter/:startdate/:enddate', Controllers.FilteredStocks);
//sending the company stocks back
// stocksRouter.get('/stocks/:companycode',Controllers.SendStocks)
//Delete all stocks of a company
// stocksRouter.delete('/stocks/:companycode',Controllers.DeleteStock); 
//Entry for a stock price
stocksRouter.post('/stocks/entry', Controllers.AddStockEntry);
exports.default = stocksRouter;
