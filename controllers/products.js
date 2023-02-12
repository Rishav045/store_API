const Product = require('../models/product.js')

const getAllProductsStatic = async(req,res) =>{
    // products = await Product.find({name:'accent chair'});
    // sorting technique in mongodb 
    // const {name}= req.query;
    // const products = await Product.find({}).sort('name')
    // const products = await Product.find({}).sort('-name')
    const products = await Product.find({}).select('company price').limit(30).skip(5)
    res.status(200).json({products, noOfHits:products.length})
}

const getAllProducts = async(req,res) =>{
    const {featured,company,name,sort,fields,numericFilters} = req.query;
    const queryObject ={}
    if(featured)
    {
        queryObject.featured= featured === 'true'?true:false
    }
    if(company)
    {
        queryObject.company=company
    }
    if(name)
    {
        queryObject.name= {$regex:name,$options:'i'}
    }

    console.log(queryObject)
    if(numericFilters)
    {
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '<':'$lt',
            '<=':'$lte',
            '=':'$eq'
        };
        const regEx=/\b(<|>|<=|>=|=)\b/g;
        let filters = numericFilters.replace(
            regEx,(match)=>`-${operatorMap[match]}-`
        );
        const options = ['price','rating']
        filters = filters.split(',').forEach((item)=>{
            const[field,operator,value] = item.split('-');
            if(options.includes(field)){
                queryObject[field]={[operator]:Number(value)};
            }
        })
    }
    console.log(queryObject)
    let result =  Product.find(queryObject)
    //sort
    if(sort)
    {
        const sortList = sort.split(',').join(' ')
        console.log(sortList)
        result = result.sort(sortList)
    }
    else
    {
        result = result.sort('creatdAt')
    }

    // select related with fields
    if(fields)
    {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    //applying pagination facility
    const page = Number(req.query.page) || 1
    console.log(page)
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit
    result = result.skip(skip)

    const products = await result
    res.status(200).json({products,'noOfHits':products.length})
}

module.exports = {getAllProductsStatic,getAllProducts}