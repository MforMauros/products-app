const Product = require('../models/product.model')

exports.findAll = async(req, res) => {
    console.log('Find all products');
    try {
        const result = await Product.find();
        res.status(200).json({data: result});
    } catch (error) {
        console.log(`Problem in reading products, ${error}`);
    }
}

exports.findOne = async(req, res) => {
    console.log('Find a product');
    const productId = req.params._id;
    try {
        const result = await Product.findOne({_id: productId});
        res.status(200).json({data: result});
    } catch (error) {
        console.log(`Problem in reading product, ${error}`)
    }
}

exports.create = async(req, res) => {
    console.log('Insert product');

    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    });

    try {
        const result = await newProduct.save();
        res.status(200).json({data: result});
        console.log('Product saved');
    } catch (error) {
        res.status(400).json({data: error});
        console.log(`Problem in saving product, ${error}`)
    }
}

exports.update = async(req, res) => {
    const productId = req.params._id;

    console.log('Update product with ID:', productId);

    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }

    try {
        const result = await Product.findOneAndUpdate(
            {_id: productId},
            updateProduct,
            {new: true}
        )
        res.status(200).json({data: result});
        console.log('Success in updating product: ', productId);
    } catch (error) {
        res.status(400).json({data: error});
        console.log('Problem in updating product: ', productId);
    }
}

exports.delete = async(req, res) => {
    const productId = req.params._id;
    console.log('Delete product: ', productId);

    try {
        const result = await Product.findOneAndDelete({_id: productId});
        res.status(200).json({data: result});
        console.log('Success in deleting product', productId);
    } catch (error) {
        res.json({data: error});
        console.log('problem in deleting product');
    }
}

