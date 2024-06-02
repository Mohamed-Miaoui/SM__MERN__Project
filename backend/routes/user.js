var express = require('express');
const { verifyToken } = require('../middlewear/auth');
const { getUser, getUserFreinds, addAndRemoveFreind } = require('../controllers/user');
var router = express.Router();


//verifyToken is middlewear that verify user token (authenticty) 
//before doing any route methode,
//if verified it pass to execution of the method by next() in middlewear
router.get("/:id",verifyToken,getUser)
router.get("/:id/freinds",verifyToken,getUserFreinds)
router.patch("/:id/:friendId",verifyToken,addAndRemoveFreind)

module.exports = router;