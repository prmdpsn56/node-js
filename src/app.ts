import * as express from 'express';
import { createConnection } from 'typeorm';
import stocksRouter from './routes/routes';
import * as amqp from 'amqplib/callback_api';
import * as Controllers from './controllers/controllers';

createConnection().then(db => {
  console.log('Database connected')
  amqp.connect(
    'amqps://kfzxhqby:sD38IHf5gxMWyzAeKOwt3ctQbY2Ypny8@codfish.rmq.cloudamqp.com/kfzxhqby',
    (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        const app = express();
        app.use(express.json());
        app.use((req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader(
            'Access-Control-Allow-Methods',
            'GET,POST,PUT,PATCH,DELETE,OPTIONS'
          );
          // res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
          next();
        });

        channel.assertQueue('company_created', { durable: false });
        channel.assertQueue('company_deleted', { durable: false });
        channel.assertQueue('rpc_queue', { durable: false });
        channel.prefetch(1);

        channel.consume('company_created', async msg => {
          channel.ack(msg);
          Controllers.RegisterStock(msg.content.toString());
        });

        channel.consume('company_deleted', async msg => {
          channel.ack(msg);
          Controllers.DeleteStock(msg.content.toString());
        });

        channel.consume(
          'rpc_queue',
          async msg => {
            let code = msg.content.toString();
            let stocks = await Controllers.SendStocks(code);
            channel.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(stocks)),
              {
                correlationId: msg.properties.correlationId
              }
            );
            channel.ack(msg);
          },
          { noAck: false }
        );

        app.use('/api', stocksRouter);
        app.use('/', (req, res, send) => {
          res.status(200).json({ message: 'This is Working' });
        });

        app.listen(8000);
        process.on('beforeExit', () => {
          console.log('closing');
          connection.close();
        });
      });
    }
  );
});
