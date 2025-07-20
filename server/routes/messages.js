const { nextId } = require("./sequenceGenerator");
const Message = require("../models/message");
const Contact = require("../models/contact");

// Message
var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  Message.find()
    .populate("sender")
    .then((msgs) => {
      res.status(200).json({
        message: "Retrieved messages from database.",
        messageObjs: msgs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem retrieving messages from the database.",
        error: err,
      });
    });
});

router.post("/", async (req, res, next) => {
  try {
    console.log('POST /messages - Request body:', req.body);
    
    const maxMessageId = await nextId("messages");
    console.log('Generated message ID:', maxMessageId);

    // Find the contact ObjectId by the string ID
    const senderContact = await Contact.findOne({ id: req.body.sender });
    if (!senderContact) {
      return res.status(400).json({
        message: "Sender contact not found.",
        error: `No contact found with ID: ${req.body.sender}`
      });
    }

    const msg = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: senderContact._id
    });

    console.log('Message to save:', msg);
    const createdMsg = await msg.save();
    console.log('Message saved successfully:', createdMsg);

    res.status(201).json({
      message: "Message added successfully.",
      messageObj: createdMsg
    });
  } catch (err) {
    console.error('Error creating message:', err);
    res.status(500).json({
      message: "There was a problem creating the message.",
      error: err.message
    });
  }
});


router.put("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((msg) => {
      msg.subject = req.body.subject;
      msg.msgText = req.body.msgText;
      msg.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, msg)
        .then((result) => {
          res.status(204).json({
            message: "Message updated successfully.",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem updating the message.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Message not found.",
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((doc) => {
      Message.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Message deleted successfully.",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem deleting the message.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Message not found.",
        error: err,
      });
    });
});
module.exports = router;
