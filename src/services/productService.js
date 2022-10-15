const Product = require('../models/productModel'); 
const {cloudinary} = require('./../utils/cloudinary'); 
module.exports = {
    createProduct: (data)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const {image,...rest}  = data; 
                const uploadResponse = await cloudinary.uploader.upload(image, {
                    upload_preset: '1906Store'
                })
                const {url} = uploadResponse; 
                const product = {
                     ...rest,
                     image:url
                }
                try {
                   const response = await Product.create(product);  
                   resolve(response); 
                } catch (error) {
                    reject(500).json(error);
                }
            } catch (error) {
                reject(error);
            }
        })
    },
    updateProduct:({productId,productUpdate})=>{
        return new Promise(async(resolve,reject)=>{
            const { image, ...rest } = productUpdate;
            const uploadResponse = await cloudinary.uploader.upload(image, {
                upload_preset: '1906Store'
            })
            const { url } = uploadResponse;
            const data = {
                ...rest,
                image: url
            }
            Product.findByIdAndUpdate({ _id: productId }, data, {
                new: true
        }).then(product=>resolve(product)).catch(err=>resolve(err))
        })
    },
    getAllProduct:()=>{
        return new Promise((resolve,reject)=>{
            Product.find({}).then(product=>resolve(product)).catch(err=>reject(err))
        })
    }, 
    getSingleProduct:(productId)=>{
        return new Promise((resolve,reject)=>{
            Product.findById({_id:productId}).then(product=>resolve(product)).catch(err=>reject(err)); 
        })
    }, 
    deleteProduct:(productId)=>{
        return new Promise((resolve,reject)=>{
            Product.findByIdAndDelete({_id:productId}).then(product=>resolve(product)).catch(err=>reject(err)); 
        })
    }
}


