const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        "name":{
            type:String,
            required:[true,"Name should be not empty"],
        },
        "price":{
            type:Number,
            required:[true,"Price is required for a product"]
        },
        "featured":{
            type:Boolean,
            default:false,
        },
        "rating":{
            type:Number,
            default:4.5,
        },
        "createdAt":{
            type:Date,
            default:Date.now(),
        },
        "company":{
            type:String,
            enum:{
                values:['ikea','liddy','caressa','marcos'],
                message:"{VALUE} is not supported"
            }
        }
    }
    
)

module.exports = mongoose.model('product',productSchema);