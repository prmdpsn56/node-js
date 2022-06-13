import { Stocks } from '../models/stock';
import { MoreThan,createQueryBuilder,LessThan,Between } from 'typeorm';

export const SendStocks = async companyCode => {
  const company_code = companyCode;
  const stocks = await Stocks.find({ code: company_code });
  return stocks;
};

export const RegisterStock = async companyCode => {
  const product = await Stocks.create({ code: companyCode });
  await Stocks.save(product);
};

export const DeleteStock = async companyCode => {
  await Stocks.delete({ code: companyCode });
};

export const AddStockEntry = async (req,res,next) => {  
  try {
    let company_code = req.body.code.toString();
    const stock = await Stocks.create({ code: company_code });
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
    const result = await Stocks.createQueryBuilder('stocks').where('stocks.id = :id', { id: 0 });
    const products = await Stocks.find({
    where: {
        time: Between(startDate,endDate);
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({'message':'API is not working, Team looking into it.'}); 
  }
  
};
