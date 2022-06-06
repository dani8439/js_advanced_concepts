"use strict";

// Exercise: Amazon shopping 
// const user = {
//     name: 'Kim', 
//     active: true,
//     cart: [],
//     purchases: []
// }

 // Class Constructor
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
};
 
class User {
  constructor(name) {
    this.name = name;
    this.active = true;
    this.cart = [];
    this.purchases = [];
    this.history = [];
  }
 
  purchaseItem(item) {
    this.addToCart(item);
    this.buyItems();
    this.emptyCart();
    this._setHistory(`purchase ${item.name} at ${this._setDate()}`);
  }
 
  addToCart(item) {
    this._addTax(item);
    this.cart.push(item);
    this._setHistory(`add ${item.name} to basket at ${this._setDate()}`);
  }
 
  emptyCart() {
    this.cart = [];
    this._setHistory(`Basket is deleted at ${this._setDate()}`);
  }
 
  buyItems() {
    this.cart.forEach(item => this.purchases.push(item));
    this.emptyCart();
    this._setHistory(`Basket was purchased at ${this._setDate()}`);
  }
 
  refund(nameProduct) {
    let refundsAmount = 0;
    this.purchases.forEach((item, index) => {
      if(item.name === nameProduct) {
        refundsAmount += +item.price;
        this.purchases.splice(index, 1);
      } 
    })
 
    // Check param
    if (!refundsAmount) return 'Invalid name, impossible to refund. Please enter a product you purchased.';
 
    this._setHistory(`Refund asked for ${nameProduct} at ${this._setDate()}`);
    console.log(`Here you are : ${refundsAmount}$ for the refund`);
  }
 
  _addTax(item) {
    item.price = (item.price *= 1.03).toFixed(2);
    return item;
  }
 
  _setHistory(string) {
    this.history.push(string)
  }
 
  _setDate() {
    let date = new Date;
    return date.toLocaleString('en-US');
  }
};
 
// Instantiate
 
const amazonCatalog = {
  desk: new Item('Standing-desk', 150), 
  book: new Item('Harry Potter', 25),
  boat: new Item('Jet-ski', 1250),
  computer: new Item('laptop', 1000)
};
 
const kim = new User('Kim');
 
// Method call
 
kim.purchaseItem(amazonCatalog.book);
kim.addToCart(amazonCatalog.desk);
kim.addToCart(amazonCatalog.boat);
 
kim.buyItems();
 
kim.refund('Standing-desk');
 
console.log(kim);

// Implement a cart feature:
// 1. Add items to cart. 
// 2. Add 3% tax to the item in cart 
// 3. But item: cart ==> purchases 
// 4. Empty cart 

// Bonus:
// accept refunds.
// track user history