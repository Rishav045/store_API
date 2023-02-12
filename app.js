require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const notfoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const routerProducts = require('./routes/products.js')
const connectDB = require('./db/connect.js')



//middleware

app.use(express.json());
app.get('/',(req,res)=>{
    res.send(`<h1>Store manager api </h1> <a href="/api/v1/products">products Routes</a>`)
})
app.use('/api/v1/products',routerProducts);


//Routes
app.use(notfoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async()=>{
    try {
       await connectDB(process.env.MONGO_URI)
        //connected to the backend
        app.listen(port,()=>{
            console.log(`The app is listening on port ${port}`)
        })

    } catch (error) {
       console.log(error) 
    }
}
start()