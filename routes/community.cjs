const express = require('express'); //import express
const router  = express.Router(); 
const communityController = require('../controllers/community.cjs');

router.get('/community',    communityController.getAllCommunity);
router.post('/community',   communityController.newCommunity); 
router.delete('/community', communityController.deleteAllCommunity);

router.get('/community/:name',    communityController.getOneCommunity);
router.post('/community/:name',   communityController.newComment);
router.delete('/community/:name', communityController.deleteOneCommunity);

module.exports = router; // export to use in server.js