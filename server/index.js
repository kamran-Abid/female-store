const express = require('express');
const app = express();
const mongoose = require("mongoose");
const router = require('./routers/route.js');
const bodyParser = require('body-parser');

require('dotenv').config();
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT || 8000;
const db = mongoose.connection;

require('./db/conn.js');
require('./models/catagory.js');
 
// defining all routers
app.use(router);

// listening the app
 app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
 });
  