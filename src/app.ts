import * as express from 'express';
import * as cors from 'cors';
import {createConnection} from 'typeorm';
import {Stocks} from './models/stock';
import stocksRouter from './routes/routes';

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

//we can get the company table using this
// const productRepository = db.getRepository(Stocks);

app.use('/api',stocksRouter)

app.use('/',(req,res,send) => {
    res.status(200).json({'message':'this is working'});
})

app.listen(8000);
})
const app = express();


