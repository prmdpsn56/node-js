import { Stocks } from '../models/stock';
import { MoreThan,createQueryBuilder,LessThan,Between } from 'typeorm';

export const SendStocks = async (req,res,send) => {
  const company_code = req.params.companycode.toLowerCase();
  const stocks = await Stocks.find({code: company_code});
  res.status(200).json(stocks);
}; 

export const RegisterStock = async companyCode => {
  const product = await Stocks.create({ code: companyCode, price: 0});
  await Stocks.save(product);
};

export const DeleteStock = async companyCode => {
  await Stocks.delete({ code: companyCode });
};

export const AddStockEntry = async (req,res,next) => {  
  try {
    let company_code = req.body.code.toString();
    let price = req.body.price;
    const stock = await Stocks.create({ code: company_code,price: price});
    const result = await Stocks.save(stock);
    res.status(200).json(result); 
  } catch (error) {
    console.log(error);
    res.status(400).json({'message':'API is not working, Team looking into it.'}); 
  }
};

export const FilteredStocks = async (req, res, send) => {
  try {
    let startDate = req.params.startdate;
    let endDate = req.params.enddate;
    let company_code = req.params.companycode.toLowerCase();
    const products = await Stocks.find({
    where: {
        code: company_code,
        time: Between(startDate,endDate)
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({'message':'API is not working, Team looking into it.'}); 
  }
  
};
