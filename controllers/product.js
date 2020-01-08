const Products = require("../models/product");
const Categories = require("../models/productCategory");
const Cart = require("../models/cart");
var Users = require("../models/user");
const Order = require("../models/order");

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
var searchText;

exports.getIndexProducts = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }

  Products.find()
    .limit(8)
    .then(products => {
      Products.find()
        .limit(8)
        .sort("buyCounts")
        .then(products2 => {
          res.render("index", {
            title: "Trang chủ",
            user: req.user,
            trendings: products,
            hots: products2,
            cartProduct: cartProduct
          });
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  const prodId = req.params.productId;
  Products.findOne({ _id: `${prodId}` }).then(product => {
    Products.find({ "productType.main": product.productType.main }).then(
      relatedProducts => {
        res.render("product", {
          title: `${product.name}`,
          user: req.user,
          prod: product,
          comments: product.comment.items,
          allComment: product.comment.total,
          cartProduct: cartProduct,
          relatedProducts: relatedProducts
        });
        product.save();
      }
    );
  });
};

exports.getProducts = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  let productType = req.params.productType;
  let productChild = req.params.productChild;

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
  Categories.find({}, (err, cats) => {
    cats.forEach(cat => {
      catName.push(cat.name);
    });
  });

  let childType;
  if (productType == undefined) {
    productType = "";
  } else {
    Categories.findOne({ name: `${productType}` }, (err, data) => {
      if (err) console.log(err);
      if (data) {
        childType = data.childName || "";
      } else {
        childType = "";
      }
    });
  }

  if (productChild == undefined) {
    productChild = "";
  }

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
        currentCat: productType,
        currentChild: productChild,
        categoriesChild: childType,
        hasNextPage: ITEM_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
        ITEM_PER_PAGE: ITEM_PER_PAGE,
        sort_value: sort_value,
        cartProduct: cartProduct
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

exports.getSearch = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  searchText =
    req.query.searchText !== undefined ? req.query.searchText : searchText;
  const page = +req.query.page || 1;

  Products.createIndexes({}).catch(err => {
    console.log(err);
  });
  Products.find({
    $text: { $search: searchText }
  })
    .countDocuments()
    .then(numProduct => {
      totalItems = numProduct;
      return Products.find({
        $text: { $search: searchText }
      })
        .skip((page - 1) * 12)
        .limit(12);
    })
    .then(products => {
      res.render("search-result", {
        title: "Kết quả tìm kiếm cho " + searchText,
        user: req.user,
        searchProducts: products,
        searchT: searchText,
        currentPage: page,
        hasNextPage: 12 * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / 12),
        cartProduct: cartProduct
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postComment = (req, res, next) => {
  const prodId = req.params.productId;
  var tname;
  if (typeof req.user === "undefined") {
    tname = req.body.inputName;
  } else {
    tname = req.user.username;
  }
  Products.findOne({
    _id: prodId
  }).then(product => {
    var today = new Date();
    product.comment.items.push({
      title: req.body.inputTitle,
      content: req.body.inputContent,
      name: tname,
      date: today,
      star: req.body.rating
    });
    product.comment.total++;
    product.save();
  });
  res.redirect("back");
};

exports.getCart = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  res.render("shopping-cart", {
    title: "Giỏ hàng",
    user: req.user,
    cartProduct: cartProduct
  });
};

exports.addToCart = (req, res, next) => {
  var prodId = req.params.productId;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Products.findById(prodId, (err, product) => {
    if (err) {
      return res.redirect("back");
    }
    cart.add(product, prodId);
    req.session.cart = cart;
    if (req.user) {
      req.user.cart = cart;
      req.user.save();
    }
    res.redirect("back");
  });
};

exports.modifyCart = (req, res, next) => {
  var prodId = req.query.id;
  var qty = req.query.qty;
  if (qty == 0) {
    return res.redirect("back");
  }
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Products.findById(prodId, (err, product) => {
    if (err) {
      return res.redirect("back");
    }
    cart.changeQty(product, prodId, qty);
    req.session.cart = cart;
    if (req.user) {
      req.user.cart = cart;
      req.user.save();
    }
    res.redirect("back");
  });
};

exports.getDeleteCart = (req, res, next) => {
  req.session.cart = null;
  if (req.user) {
    req.user.cart = {};
    req.user.save();
  }
  res.redirect("back");
};

exports.getDeleteItem = (req, res, next) => {
  var prodId = req.params.productId;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Products.findById(prodId, (err, product) => {
    if (err) {
      return res.redirect("back");
    }
    cart.deleteItem(prodId);
    req.session.cart = cart;
    if (req.user) {
      req.user.cart = cart;
      req.user.save();
    }
    console.log(req.session.cart);
    res.redirect("back");
  });
};

exports.addOrder = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  res.render("add-address", {
    title: "Thông tin giao hàng",
    user: req.user,
    cartProduct: cartProduct
  });
};

exports.postAddOrder = async (req, res, next) => {
  console.log(req.session.cart);
  if (req.session.cart.totalQty) {
    var order = new Order({
      user: req.user,
      cart: req.session.cart,
      address: req.body.address,
      phoneNumber: req.body.phone
    });

    for (var id in req.session.cart.items) {
      await Products.findOne({ _id: id })
        .then(product => {
          product.buyCounts += parseInt(req.session.cart.items[id].qty);
          product.save();
        })
        .catch(err => console.log(err));
    }

    order.save((err, result) => {
      req.flash("success", "Thanh toán thành công!");
      req.session.cart = null;
      req.user.cart = {};
      req.user.save();
      res.redirect("/account");
    });
  } else {
    req.flash("error", "Giỏ hàng rỗng!");
    res.redirect("/account");
  }
};

exports.mergeCart = (req, res, next) => {
  if (req.user.cart != {} && req.user.cart) {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart = cart.addCart(req.user.cart);
    req.session.cart = cart;
    req.user.cart = cart;
    req.user.save();
  }
  res.redirect("/");
};
