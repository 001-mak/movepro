import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import config from './config/config';
import path from 'path';

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
