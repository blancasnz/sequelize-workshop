var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki');
var userRouter = require('./user');


router.use('/wiki', wikiRouter);

router.use('/user', userRouter);

// The code below will simply render the addpage.html template
//into true HTML and send it back to the client



module.exports = router;
