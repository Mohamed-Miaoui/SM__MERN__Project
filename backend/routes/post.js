var express = require('express');
const { verifyToken } = require('../middlewear/auth');
const { createPost, getFeedPosts, getUserPosts, likePost } = require('../controllers/post');
var router = express.Router();

router.post("/create",verifyToken,createPost)
router.get("/",verifyToken,getFeedPosts)
router.get("/:userId/posts",verifyToken,getUserPosts)
router.patch("/:postId/like",verifyToken,likePost)


module.exports = router;