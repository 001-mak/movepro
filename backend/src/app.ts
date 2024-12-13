import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import config from './config/config';
import path from 'path';
import authRouter from './routes/auth.route';
import leadRouter from './routes/lead.route';
import authLimiter from './middleware/authLimiter';
import userRouter from './routes/user.route';
import inventoryRouter from './routes/inventory.route'
import materialsRouter from './routes/materials.route'
import truckRouter from './routes/truck.route';
import companyRouter from './routes/company.route';
import packageRouter from './routes/package.route';

const app: Express = express();

// Helmet is used to secure this app by configuring the http-header
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    // origin is given a array if we want to have multiple origins later
    origin: String(config.cors.cors_origin).split('|'),
    // origin: 'http://localhost:5173',
    credentials: true
  })
);

if (config.node_env === 'production') {
  app.use('/api/v1/auth', authLimiter);
}


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/leads',leadRouter);
app.use('/api/v1/inventory',inventoryRouter);
app.use('/api/v1/materials',materialsRouter);
app.use('/api/v1/trucks', truckRouter);
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/packages', packageRouter);


// app.all('*', (req, res) => {
//   res.status(404);
//   if (req.accepts('html')) {
//     res.sendFile(path.join(__dirname, 'views', '404.html'));
//   } else if (req.accepts('json')) {
//     res.json({ error: '404 Not Found' });
//   } else {
//     res.type('txt').send('404 Not Found');
//   }
// });




export default app;
