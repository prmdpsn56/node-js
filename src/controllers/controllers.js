"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilteredStocks = exports.AddStockEntry = exports.DeleteStock = exports.RegisterStock = exports.SendStocks = void 0;
var stock_1 = require("../models/stock");
var typeorm_1 = require("typeorm");
exports.SendStocks = function (companyCode) { return __awaiter(void 0, void 0, void 0, function () {
    var company_code, stocks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                company_code = companyCode;
                return [4 /*yield*/, stock_1.Stocks.find({ code: company_code })];
            case 1:
                stocks = _a.sent();
                return [2 /*return*/, stocks];
        }
    });
}); };
exports.RegisterStock = function (companyCode) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, stock_1.Stocks.create({ code: companyCode })];
            case 1:
                product = _a.sent();
                return [4 /*yield*/, stock_1.Stocks.save(product)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.DeleteStock = function (companyCode) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, stock_1.Stocks.delete({ code: companyCode })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.AddStockEntry = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var company_code, stock, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                company_code = req.body.code.toString();
                return [4 /*yield*/, stock_1.Stocks.create({ code: company_code })];
            case 1:
                stock = _a.sent();
                return [4 /*yield*/, stock_1.Stocks.save(stock)];
            case 2:
                result = _a.sent();
                res.status(200).json(result);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(400).json({ 'message': 'API is not working, Team looking into it.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.FilteredStocks = function (req, res, send) { return __awaiter(void 0, void 0, void 0, function () {
    var startDate, endDate, result, products, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                startDate = req.params.startdate;
                endDate = req.params.enddate;
                return [4 /*yield*/, stock_1.Stocks.createQueryBuilder('stocks').where('stocks.id = :id', { id: 0 })];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, stock_1.Stocks.find({
                        where: {
                            time: typeorm_1.Between(startDate, endDate)
                        },
                    })];
            case 2:
                products = _a.sent();
                res.status(200).json(products);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(400).json({ 'message': 'API is not working, Team looking into it.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
