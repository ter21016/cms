const mongoose = require('mongoose');
const Sequence = require('./server/models/sequence');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cms', {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(async () => {
   console.log('Connected to database!');
   
   // Check if sequence document exists
   const existingSequence = await Sequence.findOne();
   
   if (!existingSequence) {
     // Create initial sequence document
     const sequence = new Sequence({
       maxDocumentId: 0,
       maxMessageId: 0,
       maxContactId: 0
     });
     
     await sequence.save();
     console.log('Initial sequence document created');
   } else {
     console.log('Sequence document already exists');
   }
   
   mongoose.disconnect();
})
.catch((err) => {
   console.error('Database connection failed: ', err);
   process.exit(1);
});
