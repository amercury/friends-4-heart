const express = require('express');

const router = express.Router();

/* logout page. */
router.get('/', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
