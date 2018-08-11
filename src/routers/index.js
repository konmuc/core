const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('http://www.kongeos-muenchen.de');
});

module.exports = router;