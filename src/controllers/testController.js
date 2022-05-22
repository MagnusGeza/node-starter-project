const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  let images = [];

  if (req.files.length > 0) {
    images = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new Product({
    name: name,
    price: price,
    description: description,
    images,
  });

  await product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) res.status(200).json({ product });
  });
};

exports.editProduct = async (req, res) => {
  const { _id, name, price, description } = req.body;

  let images = [];

  if (req.files.length > 0) {
    images = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const obj = {
    name: name,
    price: price,
    description: description,
    images: images,
  };
    Product.findOneAndUpdate({ _id: _id }, obj, { new: true }).exec(
    async(error, obj) => {
      if (error) return res.status(400).json({ error });
      if (obj) return res.status(200).json({ obj });
    }
  );
};

exports.deleteProduct = async (req, res) => {
  const {_id} = req.body;
   Product.findOneAndDelete({_id: _id}).exec(async(error, result) => {
    if (error) return res.status(400).json({error});
    if (result) return res.status(200).json({message: 'Deleted'})
  })
}

exports.getProducts = async (req, res) => {
  const data = await Product.find({}).select('_id name price description images').exec();
  res.status(200).json({data});
};