var express = require('express');
var router = express.Router();
var Feedback = require('../db/feedback_schema')

router.get('/', function(req, res, next) {
  Feedback.feedbackList(function(err, feedbacks) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    res.render('feedbacks', { feedbacks: feedbacks });
  })
});

router.post('/', function(req, res, next) {
  req.assert('details', 'Details is required').notEmpty();
  req.assert('customer', 'Customer is required').notEmtpy();

  var errors = req.validationErrors();
  if (errors) {
    res.status(422).json(errors);
    return;
  }

  Feedback.createFeedback(req.body.detail, req.body.customer, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  });
});

router.get('/:feedback_id', function(req, res, next) {
  var feedback_id = req.params.feedback_id;
  Feedback.getFeedbackById(feedback_id, function(err, feedback) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      return;
    }
    res.render('feedback', { feedback: feedback });
  });
});

router.put('/:feedback_id', function(req, res, next) {
  var feedback_id = req.params.feedback_id;

  req.assert('details', 'Details is required').notEmpty();
  req.assert('customer', 'Customer is required').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.status(422).json(errors);
    return;
  }

  Feedback.updateFeedback(feedback_id, req.body.detail, req.body.customer, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  })
});

router.delete('/:feedback_id', function(req, res, next) {
  var feedback_id = req.params.feedback_id;
  Feedback.delete(feedback_id, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  })
});
module.exports = router;
