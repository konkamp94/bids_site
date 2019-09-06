const express = require('express');
const app = express();
const db = require('./dbconnect.js');
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const usersRoutes = require('./api/routes/users');
const adminRoutes = require('./api/routes/admin');
const categoriesRoutes = require('./api/routes/categories');
const morgan = require('morgan');
const bodyParser = require('body-parser');




app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});
app.use(function(req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();    
});
app.use(express.static('uploads'));
app.use('/categories',categoriesRoutes);
app.use('/products',productRoutes);
app.use('/orders',ordersRoutes);
app.use('/users',usersRoutes);
app.use('/admin',adminRoutes);
app.use((req,res,next) =>{
const error = new Error('not found');
  error.status = 404;
	next(error);
});

app.use((error,req,res,next)=>{
	res.status(error.status || 500);
	res.json({
		error:{
			message :error.message
		}
	});
});

module.exports = app;