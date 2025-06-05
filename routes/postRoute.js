const express = require('express');
const post_route_App = express();
const bodyParser = require('body-parser');

post_route_App.use(bodyParser.json());
post_route_App.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');
const path = require('path');

post_route_App.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(
      null,
      path.join(__dirname, '../public/postImages'),
      function (error, success) {
        if (error) {
          console.log(error, 'error from destination');
        }
      }
    );
  },
  filename: function (req, file, callback) {
    const name = Date.now() + '-' + file.originalname;
    callback(null, name, function (error, success) {
      if (error) {
        console.log(error, 'error from filename');
      }
    });
  },
});

const upload = multer({ storage: storage });

const postController = require('../controllers/postController');

// --------------------------------------------POST--------------------------------------------------------
post_route_App.post(
  '/create-post',
  upload.single('image'),
  postController.createPost
);
// --------------------------------------OR(for checking purpose)------------------------|
// post_route_App.post('/create-post' , function(req,res){                               |
// res.send('hi from post side');                                                        |
// });                                                                                   |
// --------------------------------------------------------------------------------------|