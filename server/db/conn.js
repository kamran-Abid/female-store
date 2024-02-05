const mongoose = require('mongoose');

mongoose.connect(process.env.DB_conn_str, {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB database successfully.');
});
