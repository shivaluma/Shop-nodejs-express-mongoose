module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.numItems = oldCart.numItems || 0;

  this.add = (item, id, qty) => {
    const itemQty = qty ? qty : 1;
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
    var storeItem = this.items[id];
    if (!storeItem) {
      storeItem = this.items[id] = { item: item, qty: 0, price: 0, images: '' };
      this.numItems++;
    }

    this.totalQty += qty - storeItem.qty;
    storeItem.qty = qty;
    storeItem.price = storeItem.item.price * storeItem.qty;
    storeItem.images = storeItem.item.images[0];
    this.totalPrice += storeItem.item.price;
  };

  this.clear = () => {
    this.items = {};
    this.totalQty = 0;
    this.totalPrice = 0;
    this.numItems = 0;
  };

  this.generateArray = () => {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
