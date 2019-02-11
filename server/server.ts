import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as validator from 'express-validator';
import * as HttpStatus from 'http-status-codes';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as path from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
const app = express();
const port = process.env.PORT || '3001';


app.use(validator());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

createConnection().then(async (connection) => {
  console.log('connected to postgres');
  // TODO: ES6 imports
  require('./common/passport')(passport);
  app.use('/api/users', require('./routes/users').default);
  app.use('/api/posts', require('./routes/posts').default);

  // error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.name === 'UnauthorizedError' || err === 'unauthorized') {
      return res.status(HttpStatus.UNAUTHORIZED).send(`invalid token`);
    }
    if (err.name === 'bad request') {
      return res.status(HttpStatus.BAD_REQUEST).send(`invalid route`);
    }
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(`Oops something went wrong`)
  });
})
  .catch((error: any) => console.log(`CANNOT CONNECT TO DB... ERROR: ${error.message}`));


app.listen(port, () => {
  console.log(`Express server started on ${port}`);
});
