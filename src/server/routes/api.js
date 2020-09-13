const express = require('express');
const router = new express.Router();
const cors = require('cors');

const apiController = require('../controllers/api.js');

router.get('/card-list/:setName', cors(), apiController.getCardsFromSet);
router.get('/set-list', cors(), apiController.getSetList);

module.exports = router;
