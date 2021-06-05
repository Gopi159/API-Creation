const Product = require("./model");

exports.post = function (req, res) {
  const product = new Product({
    Name: req.body.name,
    Price: req.body.price,
    Description: req.body.description,
  });
  product
    .save()
    .then((data) => {
      res.json({
        data: data._id,
        status: 201,
      });
    })
    .catch((err) => {
      res.json({ message: err });
    });
};
exports.update = function (req, res) {
  console.log(req.query);
  Product.findOne({ _id: req.query.id }, function (err, product) {
    product.Name = req.body.name;
    product
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  });
};

exports.getAll = function (req, res) {
  Product.find(function (err, product) {
    if (err) res.status(500).send("No Products Found");
    res.status(200).json(product);
  });
};

exports.getById = function (req, res) {
  Product.findOne({ _id: req.query.id }, function (err, product) {
    if (err) res.status(500).send("No Products Found");
    res.status(200).json(product);
  });
};
