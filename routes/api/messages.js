const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const messages = require('../../Messages');

// This route gets all messages
router.get('/', (req, res) => res.json(messages));

// Create message (we can use same route from above b/c they are different methods)
router.post('/', (req, res) => {
  const newMessage = {
    id: uuid.v4(),
    text: req.body.text,
    user: req.body.user,
    added: new Date(),
  };

  if (!newMessage.text || !newMessage.user) {
    return res.status(400).json({ msg: 'Please include a message and a name' });
  }

  messages.push(newMessage);
  res.json(messages);
});

module.exports = router;
