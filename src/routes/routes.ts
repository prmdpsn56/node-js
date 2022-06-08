import {Router} from 'express';
import * as Controllers from '../controllers/controllers';

const stocksRouter = Router();

//making a stock entry for a company
stocksRouter.post('/stocks',Controllers.RegisterStock);    

//sending the company stocks back
stocksRouter.get('/stocks/:companycode',Controllers.SendStocks)

//Delete all stocks of a company
stocksRouter.delete('/stocks/:companycode',Controllers.DeleteStock); 


export default stocksRouter;