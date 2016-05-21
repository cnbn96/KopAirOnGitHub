var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var bcrypt = require('bcrypt');
var Feedback = require('./feedback_schema');
var Item = require('./item_schema');
var db = mongoose.connection;

autoIncrement.initialize(db);

var CustomerSchema = mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    bcrypt: true
  },
  fb: String,
  phone: String,
  address: String
});
CustomerSchema.plugin(autoIncrement.plugin, 'Customer');

CustomerSchema.pre('remove', function(next) {
  Feedback.remove({customer: this._id}).exec();
  Item.remove({customer: this._id}).exec();
  next();
})

var Customer = module.exports = mongoose.model("Customer", CustomerSchema);

module.exports.customerList = function(callback) {
  Customer.find({}, function(err, customers) {
    callback(err, customers);
  });
}

module.exports.getCustomerById = function(id, callback) {
  Customer.findById(function(err, customer) {
    callback(err, customers);
  });
}

module.exports.updateCustomer = function(id, name, email, fb, phone, address) {
  Customer.update({_id: id}, {name: name, email: email, fb: fb, phone: phone, address: address}, {}, function(err, numAffected) {
    callback(err);
  })
}

module.exports.deleteCustomer = function(id, callback) {
  Customer.remove({_id: id}, function(err) {
    if (err) {
      callback(err);
      return;
    }
  })
}

module.exports.createCustomer = function(name, email, password, fb, phone, address, callback) {
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      callback(err);
      return;
    }
    var newCustomer = new Customer({
      name: name,
      email: email,
      password: hash,
      fb: fb,
      phone: phone,
      address: address
    });
    newCustomer.save();
  })
}
