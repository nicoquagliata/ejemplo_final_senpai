const express = require('express');
const router = express.Router();

const watsonVisualRecognitionController = require('../controllers/watsonVisualRecognitionController');

router.get('/', (request, response) => {
    response.send('Hello World updated');
});

router.post('/classify/image', watsonVisualRecognitionController.classifyImage);

module.exports = router;