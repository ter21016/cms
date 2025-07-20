const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  id: { type: String, required: true },
  subject: { type: String },
  msgText: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
});

// Transform to exclude _id and __v when converting to JSON
messageSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model("Message", messageSchema);
