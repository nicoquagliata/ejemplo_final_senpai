const express = require('express');
const router = express.Router();

const watsonVisualRecognitionController = require('../controllers/watsonVisualRecognitionController');

// controllers
const watsonDiscoveryController = require('../controllers/watsonDiscoveryController');

router.get('/', (request, response) => {
    response.send('Hello World updated for testing');
});

router.post('/classify/image', watsonVisualRecognitionController.classifyImage);
router.post('/search/discovery', watsonDiscoveryController.query);

module.exports = router;
