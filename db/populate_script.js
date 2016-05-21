var Customer = require('./customer_schema');
var Item = require('./item_schema');
var Feedback = require('./feedback_schema');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/kopair');

Customer.createCustomer('Ryan', 'ryan@gmail.com', '1234', 'fb/ryan', '0123456789', 'California');
Customer.createCustomer('Lacie', 'lacie@gmail.com', '1234', 'fb/lacie', '0123456789', 'New York');
Customer.createCustomer('Jack', 'jack@gmail.com', '1234', 'fb/jack', '0123456789', 'Virginia');
Customer.createCustomer('Oswald', 'oswald@gmail.com', '1234', 'fb/oswald', '0123456789', 'Vancouver');

Item.createItem('Laptop', 0, 'Shipped', '2016-4-30', '2016-5-24');
Item.createItem('Game', 1, 'Arrived', '2016-4-12', '2016-5-1');
Item.createItem('Shoes', 2, 'In store', '2016-5-20', '2016-5-31');
Item.createItem('Novel', 3, 'Cancelled', '2016-5-30', '2016-6-12');

Feedback.createFeedback('It\'s taking too long to arrive', 0);
Feedback.createFeedback('The item is in good condition', 1);
Feedback.createFeedback('I heard negative feedbacks about this item from other customers', 3);;

console.log('Dummy database created');
