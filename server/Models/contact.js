const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    id: { type: String, require: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    imageUrl: {type: String },
    group: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}],
});

// Transform to exclude _id and __v when converting to JSON
contactSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Contact', contactSchema);

