require('dotenv').config();
const connectDB = require('./db/connect.js')
const Product = require('./models/product.js')
const data = require('./products.json');

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(data);
        process.exit(0)
        console.log('success!!!')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start();