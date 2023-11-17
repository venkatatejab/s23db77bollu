var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('goat', { title: 'Search Results goat' });
});
var express = require('express');
const goat_controlers= require('../controllers/goat');
var router = express.Router();
/* GET goats */
router.get('/', goat_controlers.goat_view_all_Page );
router.get('/detail', goat_controlers.goat_view_one_Page);
router.get('/create', goat_controlers.goat_create_Page);
router.get('/update', goat_controlers.goat_update_Page);
router.get('/delete', goat_controlers.goat_delete_Page);

module.exports = router;