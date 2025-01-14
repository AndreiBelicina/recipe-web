const express = require("express");
const app = express();
require ("dotenv").config();
const connectDb = require("./config/connectionDb")
const cors = require("cors")
const path = require('path');

connectDb ()
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.use("/", require("./routes/user"))
app.use("/recipe", require("./routes/recipe"))
app.use('/images', express.static(path.join(__dirname, 'public/images')));


app.listen(process.env.PORT, () => {
  console.log('listening on port 4000!!!');
});


