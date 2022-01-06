const express = require('express');
const router = express.Router();
const messages = require('../../Messages');

// This route gets all messages
router.get('/', (req, res) => res.json(messages));

module.exports = router;
