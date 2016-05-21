var express = require('express');
var router = express.Router();
var Customer = require('../db/customer_schema');
var Item = require('../db/item_schema');
var Feedback = require('../db/feedback_schema');

/* GET home page. */
router.get('/', function(req, res) {
  Customer.customerList(function(err, customers) {
    if (err) {
      req.sendStatus(400);
      return;
    }
    Item.populatedList(function(err, items) {
      if (err) {
        req.sendStatus(400);
        return;
      }

      Feedback.populatedList(function(err, feedbacks) {
        if (err) {
          console.log(err);
          res.sendStatus(400);
          return;
        }
        res.render('index', {title: 'Kopair', customers: customers, items: items, feedbacks: feedbacks});
      });
    });
  });
});

module.exports = router;
