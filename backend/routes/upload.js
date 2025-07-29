const express = require('express');
const multer = require('multer');
const { analyzeCSV } = require('../controllers/analyzeController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), analyzeCSV);

module.exports = router;
