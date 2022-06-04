import * as express from 'express';
import * as cors from 'cors';
import {createConnection} from 'typeorm';
import {Stocks} from './models/stock';

createConnection().then((db)=>{
//we have basically define the cors policies, you can do this the other way too;
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:8080','http://localhost:4200']
}))

//middleware that will parse the incoming json requests
app.use(express.json());

//getting the company table
const productRepository = db.getRepository(Stocks);

//reaching the /route
// app.use('/',(req,res,next)=>{
//     console.log('this is working');
// res.send({
//     message:'this is working again'
//     })
// })


app.get('/api/products',async (req,res) => {
    const products = await productRepository.find({
        where:{
            id: 2
        }
    });
    res.status(200).json(products);
})    

app.post('/api/products',async (req,res) => {
    const product = await productRepository.create(req.body);
    const result = await productRepository.save(product);
    res.status(200).json(result);
})    

app.get('/api/products/:id',async (req,res) => {
    const product = await productRepository.findOne(req.params.id);
    res.status(200).json(product);
})    

app.put('/api/products/:id',async (req,res) => {
    const product = await productRepository.findOne(req.params.id);
    productRepository.merge(product,req.body)
    const result = await productRepository.save(product);
    res.status(200).json(product);
})    

app.delete('/api/products/:id',async (req,res) => {
    const product = await productRepository.delete(req.params.id);
    res.status(200).json(product);
}) 

app.listen(8000);
})
const app = express();


