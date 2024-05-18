const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/', productController.findAll);
router.get('/:_id', productController.findOne);
router.post('/', productController.create);
router.patch('/:_id', productController.update);
router.delete('/:_id', productController.delete);

module.exports = router;