var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var Customer = require('../db/customer_schema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Customer.customerList(function(err, customers) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    }
    console.log(customers);
    res.render('customers', { customers: customers });
  })
});

router.post('/', function(req, res, next) {
  req.assert('name', 'Name is required').notEmpty();
  req.assert('email', 'Email is required').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be 8 to 20 characters long').len(8,20);
  req.assert('password', 'Password must contain only alphanumeric characters').isAlphanumeric();
  req.assert('password2', 'Does not match password').equals(req.body.password);

  var errors = req.validationErrors();
  if (errors)  {
    res.status(422).json(errors);
    return;
  }
  Customer.createUser(req.body.name, req.body.email, req.body.password, req.body.fb,
                      req.body.phone, req.body.address, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  });
});

router.get('/:customer_id', function(req, res, next) {
  var customer_id = req.params.customer_id;
  var customer = Customer.getCustomerById(id, function(err, customer) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      return;
    }
    res.render('customer_profile', { customer: customer });
  })
});

router.put('/:customer_id', function(req, res, next) {
  var customer_id = req.params.customer_id;

  req.assert('name', 'Name is required').notEmpty();
  req.assert('email', 'Email is required').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();

  var errors = req.validationErrors();

  if (errors) {
    res.status(422).json(errors);
    return;
  }

  Customer.update(customer_id, req.body.name, req.body.email, req.body.fb,
                  req.body.phone, req.body.address, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  });
});

router.delete('/:customer_id', function(req, res, next) {
  var customer_id = req.params.customer_id;
  Customer.deleteCustomer(customer_id, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  })
});
module.exports = router;
