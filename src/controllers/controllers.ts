import {Stocks} from '../models/stock';

export const SendStocks = async (req,res,send) => {
    const company_code = req.params.companycode.toLowerCase();
    const stocks = await Stocks.find({code: company_code});
    res.status(200).json(stocks);
}; 
    
export const RegisterStock = async (req,res,send) => {
    const product = await Stocks.create(req.body);
    const result = await Stocks.save(product);
    res.status(200).json(result);
}

export const DeleteStock = async (req,res,send) => {
    const company_code = req.params.companycode.toLowerCase();
    await Stocks.delete({code: company_code});
    res.status(200).json({'message':company_code + ' is delete from record'});
}

export const FilteredStocks = async (req,res,send) => {
    const products = await Stocks.find({
                where:{
                    id: 2
                }
            });
            res.status(200).json(products);
}