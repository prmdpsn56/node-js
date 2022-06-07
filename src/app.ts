import * as express from 'express';
import * as cors from 'cors';
import {createConnection} from 'typeorm';
import {Stocks} from './models/stock';

createConnection().then((db)=>{
//we have basically define the cors policies, you can do this the other way too;
// app.use(cors({
//     origin: ['http://localhost:3000','http://localhost:9090','http://localhost:4200']
// }))

//middleware that will parse the incoming json requests
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    // define the settings of the below headers
    // res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

app.use(express.json());

// Getting the company table
const productRepository = db.getRepository(Stocks);

// Date filter to be modified still
app.get('/api/products',async (req,res) => {
    const products = await productRepository.find({
        where:{
            id: 2
        }
    });
    res.status(200).json(products);
});    

app.post('/api/stock',async (req,res) => {
    const product = await productRepository.create(req.body);
    const result = await productRepository.save(product);
    res.status(200).json(result);
});    

//sending the company stocks
app.get('/api/stocks/:companycode',async (req,res) => {
    const company_code = req.params.companycode.toLowerCase();
    const stocks = await productRepository.find({code: company_code},{lean: true});
    res.status(200).json(stocks);
}); 

//delete all stocks
app.delete('/api/stocks/:companycode',async (req,res) => {
    const company_code = req.params.companycode.toLowerCase();
    await productRepository.delete({code: company_code},{lean: true});
    res.status(200).json({'message':company_code + ' is delete from record'});
}); 


app.listen(8000);
})
const app = express();


