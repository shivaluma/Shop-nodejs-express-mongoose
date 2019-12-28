module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.numItems = oldCart.numItems || 0;

  this.add = (item, id) => {
    var storeItem = this.items[id];
    if (!storeItem) {
      storeItem = this.items[id] = { item: item, qty: 0, price: 0, images: "" };
      this.numItems++;
    }
    storeItem.qty++;
    storeItem.price = storeItem.item.price * storeItem.qty;
    storeItem.images = storeItem.item.images[0];
    this.totalQty++;
    this.totalPrice += storeItem.item.price;
  };

  this.generateArray = () => {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
