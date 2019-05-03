const express = require('express');

const postController = require('../controllers/posts');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const router = express.Router();

// use multer
// create post
router.post('', checkAuth, extractFile, postController.createPost);

// update post
router.put('/:id', checkAuth, extractFile, postController.updatePost);

// get posts
router.get('', postController.getPosts);

// get a post
router.get('/:id', postController.getPost);

router.delete('/:id', checkAuth, postController.deletePost);

module.exports = router;