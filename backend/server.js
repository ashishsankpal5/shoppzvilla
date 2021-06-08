import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json()); // parse the body

app.use(morgan('dev'));

//route/endpoints
app.get('/', (req, res) => {
  res.send('API IS RUNNING!');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

//Paypal Data Endpoints
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

//Error Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running on the port ${PORT}`.yellow.bold)
);

// app.get('/api/products', (request, response) => {
//   response.json(products);
// });

// app.get('/api/products/:id', (request, response) => {
//   const product = products.find((prod) => prod._id === request.params.id);
//   response.json(product);
// });
