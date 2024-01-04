// save file using Multer  // Path: Backend/controller/fileHandel.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
}).single('file');

async function fileUpload(req, res) {
  if (req.method === 'POST') {
    try {
      upload(req, res, function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error uploading file.' });
        }
        console.log(req.file);
        return res
          .status(200)
          .json({ message: 'File uploaded successfully.', ...req.file });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// pages/api/download.js

//http://localhost:5000/api/v1/file/get/dhabksj

function fileDownload(req, res) {
  if (req.method === 'GET') {
    console.log('hello', req.params.fileName);

    const filePath = path.join(
      process.cwd(),
      'public/uploads/',
      req.params.fileName
    );

    try {
      if (fs.existsSync(filePath)) {
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
      } else {
        res.status(404).json({ error: 'File not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

module.exports = {
  fileUpload,
  fileDownload,
};
