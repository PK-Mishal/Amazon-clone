import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from "../util.js";

const productRouter = express.Router();


// sending list of products to forntend
productRouter.get('/',expressAsyncHandler(async(req,res)=>{
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller =  req.query.seller || '' ;
    const order = req.query.order || '';
    const min = req.query.min && Number(req.query.min) !== 0? Number(req.query.min):0;
    const max = req.query.max && Number(req.query.max) !== 0? Number(req.query.max):0;
    const rating = req.query.rating && Number(req.query.rating) !== 0? Number(req.query.rating):0;



    const nameFilter = name? {name: {$regex : name, $options : 'i'}}: {};
    const sellerFilter = seller? {seller}: {};
    const categoryFilter = category? {category}: {};
    const pricefilter = min && max ? {price:{$gte:min,$lte:max}} : {};
    const ratingfilter = rating ? {rating:{$gte:rating}} : {};
    const sortOrder = order  === 'lowest'? {price:1}:
     order === 'highest' ? {price: -1}:
     order === 'toprated'? {rating:-1}:
     {_id: -1}
    

    const products = await Product.find({
         ...sellerFilter,
         ...nameFilter,
         ...categoryFilter,
         ...pricefilter,
         ...ratingfilter,
          }).populate('seller','seller.name seller.logo')
          .sort(sortOrder);
                      
    res.send(products);
    // console.log(products);
}));

productRouter.get('/categories',expressAsyncHandler(async(req,res)=>{
    const categories = await Product.find().distinct('category');
    res.send(categories)
}))

productRouter.get('/seed',expressAsyncHandler(async(req,res)=>{
    // await Product.remove({})
    const products = await Product.find({});
    console.log(products,'ogk');
    const createdProducts = await Product.insertMany(data.products);
   
    res.send({createdProducts});

}));

// returning details of the product to frontend
productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id).populate('seller','seller.name seller.logo seller.rating seller.numReviews');
    if(product){
         res.send(product)
        //  console.log("setttt");
    }else{
         res.status(404).send({message:"Product not found"})
         console.log('okk');
    }
   
}));

productRouter.post('/',isAuth,isSellerOrAdmin,expressAsyncHandler(async(req,res)=>{
   const product = new Product({
    name:'sample name'+Date.now(),
    seller:req.user._id,
    category:'sample categry',
    brand:'sample brand',
    image:'../images/p1.jpg',
    price:0,
    countInStock:0,
    rating:0,
    numReviews:0,
    description:"sample description"
   })
   const createdProduct = await product.save();
   res.send({ message: 'Product Created', product: createdProduct });
}))

productRouter.put('/:id',isAuth,isSellerOrAdmin,expressAsyncHandler(async(req,res)=>{
    const productId = req.params.id;
    const product= await Product.findById(productId);
    if(product){
        product.name= req.body.name || product.name;
        product.price= req.body.price || product.price;
        product.image= req.body.image || product.image;
        product.category= req.body.category || product.category;
        product.brand= req.body.brand || product.brand;
        product.countInStock= req.body.countInStock || product.countInStock;
        product.description= req.body.description || product.description;

       const updatedProduct =await product.save();
       res.send({message:"Product Updated",product:updatedProduct})

    }else{
        res.status(404).send({message:'Product not Found'})
    }

}))
productRouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const product =await Product.findById(req.params.id);
    if(product){
        const deleteProducts = await product.remove();
        res.send({message:'Product Deleted',product:deleteProducts});
    }else{
        res.status(404).send({message:'Product not Found'})

    }
}))

export default productRouter;