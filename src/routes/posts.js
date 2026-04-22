const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// These are now relative to the "/api/posts" path we will set later
router.get('/', postsController.getAllPosts);
router.post('/', postsController.createPost);

module.exports = router;
