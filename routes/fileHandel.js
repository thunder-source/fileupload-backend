const express = require('express');
const router = express.Router();

const { fileUpload, fileDownload } = require('../controller/fileHandel');

router.route('/').post(fileUpload);
router.route('/:fileName').get(fileDownload);

module.exports = router;
