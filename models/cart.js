module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.numItems = oldCart.numItems || 0;

  this.add = (item, id, qty) => {
    const itemQty = qty ? Number(qty) : 1;
    var storeItem = this.items[id];
    if (!storeItem) {
      storeItem = this.items[id] = { item: item, qty: 0, price: 0, images: '' };
      this.numItems++;
    }
    storeItem.qty += itemQty;
    storeItem.price = storeItem.item.price * storeItem.qty;
    storeItem.images = storeItem.item.images[0];
    this.totalQty += itemQty;
    this.totalPrice += storeItem.item.price;
  };

  this.changeQty = (item, id, qty) => {
    const itemQty = qty ? Number(qty) : 1;
    var storeItem = this.items[id];
    if (!storeItem) {
      storeItem = this.items[id] = { item: item, qty: 0, price: 0, images: '' };
      this.numItems++;
    }
    let oldQty = storeItem.qty;
    storeItem.qty = itemQty;
    storeItem.price = storeItem.item.price * storeItem.qty;
    storeItem.images = storeItem.item.images[0];
    this.totalQty += itemQty - oldQty;
    this.totalPrice += storeItem.price - storeItem.item.price * oldQty;
  };

  this.deleteItem = id => {
    var storeItem = this.items[id];
    this.totalQty -= storeItem.qty;
    this.totalPrice -= storeItem.price;
    this.numItems--;
    delete this.items[id];
  };

  this.addCart = cart => {
    for (var id in cart.items) {
      var storeItem = this.items[id];

      if (!storeItem) {
        storeItem = this.items[id] = {
          item: cart.items[id].item,
          qty: cart.items[id].qty,
          price: cart.items[id].price,
          images: cart.items[id].images
        };

        this.numItems++;
      } else {
        storeItem.qty += parseInt(cart.items[id].qty);
        storeItem.price += cart.items[id].price;
      }
      this.totalQty += cart.items[id].qty;
      this.totalPrice += cart.items[id].price;
    }
    return this;
  };

  this.generateArray = () => {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
