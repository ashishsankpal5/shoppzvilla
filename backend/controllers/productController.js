import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  public
const getProducts = asyncHandler(async (request, response) => {
  const products = await Product.find({});
  response.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  public
const getProductById = asyncHandler(async (request, response) => {
  const product = await Product.findById(request.params.id);
  if (product) {
    response.json(product);
  } else {
    response.status(404).json({ message: 'Product Not Fund' });
  }
});

//@desc  DELETE A PRODUCT
//@route DELETE /api/products/:id
//accesss Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
    await product.remove();
    res.json({ message: 'Product Removed' });
  } else {
    res.status(404).json({ message: 'Product Not Found' });
  }
});

//@desc CREATE A PRODUCT
//@route post/api/products
//@access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'PRODUCT NAME',
    price: 0,
    user: req.user._id,
    image: '/image/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc Update A product
//@route put/api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};

// //-------------Fetching all Products Using Try catch block

// router.get('/', async (request, response) => {
//   try {
//     const products = await Product.find({});
//     response.json(products);
//   } catch (error) {
//     response.send(error);
//   }
// });

// //-------------Fetching Single Products Using Try Catch block

// router.get('/:id', async (request, response) => {
//   try {
//     const product = await Product.findById(request.params.id);
//     response.json(product);
//   } catch (error) {
//     response.send(error);
//   }
// });
