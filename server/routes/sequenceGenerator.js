const Sequence = require('../models/sequence');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

async function initializeSequence() {
  const sequence = await Sequence.findOne();
  if (!sequence) throw new Error("Sequence document not found.");

  sequenceId = sequence._id;
  maxDocumentId = sequence.maxDocumentId;
  maxMessageId = sequence.maxMessageId;
  maxContactId = sequence.maxContactId;
}

async function nextId(collectionType) {
  if (!sequenceId) {
    await initializeSequence();
  }

  let updateObject = {};
  let nextId;

  switch (collectionType) {
    case "documents":
      maxDocumentId++;
      updateObject = { maxDocumentId };
      nextId = maxDocumentId;
      break;
    case "messages":
      maxMessageId++;
      updateObject = { maxMessageId };
      nextId = maxMessageId;
      break;
    case "contacts":
      maxContactId++;
      updateObject = { maxContactId };
      nextId = maxContactId;
      break;
    default:
      throw new Error("Invalid collection type");
  }

  await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
  return nextId;
}

module.exports = { nextId };
