const mongoose = require('mongoose');


const childDocumentSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String },
});

const documentSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String},
  children: [{ type: childDocumentSchema }],
});

// Transform to exclude _id and __v when converting to JSON
documentSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Document', documentSchema);


