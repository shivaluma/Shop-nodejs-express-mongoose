const Products = require("../models/product");
const Categories = require("../models/productCategory")
const removeAccent = require("../util/removeAccent")

var ITEM_PER_PAGE = 12;
var SORT_ITEM;
var sort_value = "Giá thấp tới cao";
var ptype;
var ptypesub;
var pprice = 999999;
var psize;
var plabel;
var plowerprice;
var price;

exports.getIndexProducts = (req, res, next) => {
  Products.find()
    .limit(8)
    .then(products => {
      res.render("index", {
        title: "Trang chủ",
        user: req.user,
        trendings: products
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Products.find({ _id: `${prodId}` })
    .then(product => {
      res.render("product", {
        title: `${product[0].name}`,
        user: req.user,
        prod: product[0]
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {

  let productType = req.params.productType
  let productChild = req.params.productChild

  console.log("TYPE + CHILD " + productType + productChild);

  ptype = req.query.type !== undefined ? req.query.type : ptype;
  ptypesub = req.query.type !== undefined ? req.query.type : ptypesub;
  pprice = req.query.price !== undefined ? req.query.price : 999999;
  psize = req.query.size !== undefined ? req.query.size : psize;
  plabel = req.query.label !== undefined ? req.query.label : plabel;
  plowerprice = pprice !== 999999 ? pprice - 50 : 0;
  plowerprice = pprice == 1000000 ? 200 : plowerprice;
  SORT_ITEM = req.query.orderby;

  if (SORT_ITEM == -1) {
    sort_value = "Giá cao tới thấp";
    price = "-1";
  }
  if (SORT_ITEM == 1) {
    sort_value = "Giá thấp tới cao";
    price = "1";
  }

  if (Object.entries(req.query).length == 0) {
    ptype = "";
    psize = "";
    plabel = "";
    ptypesub = "";
  }

  var page = +req.query.page || 1;
  let totalItems;
  let catName = [];
  Categories.find({}, (err,cats) => {
      cats.forEach((cat) => {
        catName.push(cat.name)
      })
  })

  
  

  let childType;
  if (productType == undefined) {
    productType = ""
  }
  else {
    Categories.find({name : `${productType}`}, (err,data) => {
      childType = data[0].childName
    });
  }

  if (productChild == undefined) {
    productChild = "";
  }



  console.log("type : ", productType);
  Products.find({
    "productType.main": new RegExp(productType, "i"),
    "productType.sub": new RegExp(productChild, "i"),
    size: new RegExp(psize, "i"),
    price: { $gt: plowerprice, $lt: pprice },
    labels: new RegExp(plabel, "i")
  })
    .countDocuments()
    .then(numProduct => {
      totalItems = numProduct;
      return Products.find({
        "productType.main": new RegExp(productType, "i"),
        "productType.sub": new RegExp(productChild, "i"),
        size: new RegExp(psize, "i"),
        price: { $gt: plowerprice, $lt: pprice },
        labels: new RegExp(plabel, "i")
      })
        .skip((page - 1) * ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE)
        .sort({
          price
        });
    })
    .then(products => {
      res.render("products", {
        title: "Danh sách sản phẩm",
        user: req.user,
        allProducts: products,
        currentPage: page,
        categories: catName,
        currentCat : productType,
        currentChild : productChild,
        categoriesChild: childType,
        hasNextPage: ITEM_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
        ITEM_PER_PAGE: ITEM_PER_PAGE,
        sort_value: sort_value
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNumItems = (req, res, next) => {
  ITEM_PER_PAGE = parseInt(req.body.numItems);
  res.redirect("back");
};
