var express = require('express');
var router = express.Router();
var Item = require('../db/item_schema');

router.get('/', function(req, res, next) {
  Item.itemList(function(err, items) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    }
    res.render('items', { items: items });
  })
});

router.post('/', function(req, res, next) {
  req.assert('name', 'Name is required').notEmpty();
  req.assert('details', 'Details is required').notEmpty();
  req.assert('customer', 'Customer is required').notEmpty();
  req.assert('status', 'Status is required').notEmpty();
  req.assert('shipping', 'Shipping date is required').notEmpty();
  req.assert('delivery', 'Delivery date is required').notEmpty();

  var errors = req.validationErrors();
  if (errors)  {
    res.status(422).json(errors);
    return;
  }

  Item.createItem(req.body.name, req.body.details, req.body.customer, req.body.status,
                  req.body.shipping, req.body.delivery, function(err) {
                    if (err) {
                      console.log(err);
                      res.sendStatus(500);
                      return;
                    }
                  });
});

router.get('/:item_id', function(req, res, next) {
  var item_id = req.params.item_id;
  Item.getItemById(item_id, function(err, item) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      return;
    }
    res.render('item', { item: item});
  })
});

router.put('/:item_id', function(req, res, next) {
  var item_id = req.params.item_id;

  req.assert('details', 'Details is required').notEmpty();
  req.assert('customer', 'Customer is required').notEmpty();
  req.assert('status', 'Status is required').notEmpty();
  req.assert('shipping', 'Shipping date is required').notEmpty();
  req.assert('delivery', 'Delivery date is required').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.status(422).json(errors);
    return;
  }

  Item.updateItem(item_id, req.body.details, req.body.customer, req.body.status,
                  req.body.shipping, req.body.delivery, function(err) {
                    if (err) {
                      console.log(err);
                      res.sendStatus(500);
                      return;
                    }
                  })
});

router.delete('/:item_id', function(req, res, next) {
  var item_id = req.params.item_id;
  Item.deleteItem(item_id, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  })
});

module.exports = router;
