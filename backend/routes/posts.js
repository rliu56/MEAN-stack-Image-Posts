const express = require('express');
const multer = require('multer');

const postController = require('../controllers/posts');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

// multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images'); // this path is related to the server.js
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

// use multer
// create post
router.post("", checkAuth, multer({storage}).single('image'), postController.createPost);

// update post
router.put("/:id", checkAuth, multer({storage}).single('image'), postController.updatePost);

// get posts
router.get('', postController.getPosts);

// get a post
router.get('/:id', postController.getPost);

router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;