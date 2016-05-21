var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var db = mongoose.connection;
autoIncrement.initialize(db);

var ItemSchema = mongoose.Schema({
  details: String,
  customer_id: {
    type: Number,
    ref: 'Customer'
  },
  status: String,
  shippingDate: Date,
  deliveryDate: Date
});

ItemSchema.plugin(autoIncrement.plugin, 'Item');

var Item = module.exports = mongoose.model("Item", ItemSchema);

module.exports.itemList = function(callback) {
  Item.find({}, function(err, items) {
    callback(err, items);
  });
}

module.exports.populatedList = function(callback) {
  Item.find({}).populate('customer_id').exec(function(err, items) {
    callback(err, items);
  })
}
module.exports.getItemById = function(id, callback) {
  Item.findById(function(err, item) {
    callback(err, items);
  });
}

module.exports.updateItem = function(id, details, customer, status, shippingDate, deliveryDate) {
  Item.update({_id: id}, {details: details, customer: customer, status: status,
              shippingDate: shippingDate, deliveryDate: deliveryDate}, {}, function(err, numAffected) {
    callback(err);
  })
}

module.exports.deleteItem = function(id, callback) {
  Item.remove({_id: id}, function(err) {
    callback(err);
  })
}

module.exports.createItem = function(details, customer, status, shippingDate, deliveryDate, callback) {
  var newItem = new Item({
    details: details,
    customer_id: customer,
    status: status,
    shippingDate: new Date(shippingDate),
    deliveryDate: new Date(deliveryDate)
  });
  newItem.save();
}
