var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var db = mongoose.connection;
autoIncrement.initialize(db);

var FeedbackSchema = mongoose.Schema({
  details: String,
  customer_id: {
    type: Number,
    ref: 'Customer'
  }
});

FeedbackSchema.plugin(autoIncrement.plugin, 'Feeback');

var Feedback = module.exports = mongoose.model("Feedback", FeedbackSchema);

module.exports.feedbackList = function(callback) {
  Feedback.find({}, function(err, feedbacks) {
    callback(err, feedbacks);
  });
}

module.exports.populatedList = function(callback) {
  Feedback.find({}).populate('customer_id').exec(function(err, feedbacks) {
    callback(err, feedbacks);
  })
}

module.exports.getFeedbackById = function(id, callback) {
  Feedback.findById(function(err, feedback) {
    callback(err, feedbacks);
  });
}

module.exports.updateFeedback = function(id, details, customer) {
  Feedback.update({_id: id}, {details: details, customer: customer}, {}, function(err, numAffected) {
    callback(err);
  })
}

module.exports.deleteFeedback = function(id, callback) {
  Feedback.remove({_id: id}, function(err) {
    callback(err);
  })
}

module.exports.createFeedback = function(details, customer, callback) {
  var newFeedback = new Feedback({
    details: details,
    customer_id: customer,
  });
  newFeedback.save();
}
