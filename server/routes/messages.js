var express = require('express');
var router = express.Router();

/* GET all messages */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'Messages fetched successfully!',
    messages: [] // Placeholder for actual messages
  });
});

module.exports = router;