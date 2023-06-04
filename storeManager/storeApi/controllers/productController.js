const product = require('../models/product');

const getProducts = async (req, res) => {
  const { name, company, featured, sort, field } = req.query;
  let queryObj = {};
  let sortValue = '';
  let fieldValue = '';
  let limit = Number(req.query.limit) || 10;
  let page = Number(req.query.page) || 1;
  let skip = (page - 1) * limit;

  if (name) queryObj.name = { $regex: name, $options: 'i' };
  if (company) queryObj.company = company;
  if (featured) queryObj.featured = featured;
  if (sort) sortValue = sort.replace(',', ' ');
  if (field) fieldValue = field.replace(',', ' ');

  try {
    const products = await product
      .find(queryObj)
      .sort(sortValue)
      .select(fieldValue)
      .limit(limit)
      .skip(skip);
    return res.status(200).json({ count: products.length, products });
  } catch (error) {
    return res.status(200).json(error);
  }
};

const addProduct = async (req, res) => {
  try {
    const addProducts = await product.create(req.body);
    return res.status(200).json(addProducts);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = { getProducts, addProduct };
