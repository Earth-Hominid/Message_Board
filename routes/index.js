const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const moment = require('moment');
const messages = require('../Messages');

// Homepage Route
router.get('/', (req, res) =>
  res.render('index', {
    title: 'Message Board App',
    messages,
  })
);

// Create message (we can use same route from above b/c they are different methods)
router.post('/new', (req, res) => {
  const newMessage = {
    id: uuid.v4(),
    text: req.body.text,
    user: req.body.user,
    added: new Date(),
  };

  // if (!newMessage.text || !newMessage.user) {
  //   return res.status(400).json({ msg: 'Please include a message and a name' });
  // }

  messages.push(newMessage);
  res.redirect('/');
});

// Update Message
router.put('/:id', (req, res) => {
  const found = messages.some(
    (message) => message.id === parseInt(req.params.id)
  );

  if (found) {
    const updateMessage = req.body;
    messages.forEach((message) => {
      if (message.id === parseInt(req.params.id)) {
        message.text = updateMessage.text ? updateMessage.text : message.text;
        message.user = updateMessage.user ? updateMessage.user : message.user;

        // Need to send back response
        res.json({ msg: 'Message has been updated', message });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `There is no message with id of ${req.params.id}` });
  }
});

// Delete Message
router.delete('/:id', (req, res) => {
  const found = messages.some(
    (message) => message.id === parseInt(req.params.id)
  );

  if (found) {
    res.json({
      msg: 'Message deleted',
      messages: messages.filter(
        (message) => message.id != parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `No message with id of ${req.params.id}` });
  }
});

module.exports = router;
