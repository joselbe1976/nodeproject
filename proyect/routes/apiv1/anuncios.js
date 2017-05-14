"use_strict";

var express = require('express');
var router = express.Router();
const security = require('../../libs/security');

//seguridad



/* Lista de anuncios */
router.get('/',security, function(req, res, next) {
  console.log(req.query.token);
data = "hoola";
  res.json({data: data});
});

module.exports = router;
