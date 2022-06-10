import { Stocks } from '../models/stock';

export const SendStocks = async (req, res, send) => {
  const company_code = req.params.companycode.toLowerCase();
  const stocks = await Stocks.find({ code: company_code });
  res.status(200).json(stocks);
};

export const RegisterStock = async companyCode => {
  const product = await Stocks.create({ code: companyCode });
  await Stocks.save(product);
};

export const DeleteStock = async companyCode => {
  await Stocks.delete({ code: companyCode });
};

export const FilteredStocks = async (req, res, send) => {
  const products = await Stocks.find({
    where: {
      id: 2
    }
  });
  res.status(200).json(products);
};
