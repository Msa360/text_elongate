const express = require("express");
const path = require("path");
require('dotenv').config(); // for .env vars

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post("/api", (req, res) => {
    // todo make api call to openai to add inserts
    res.send("<h1>This is from express.js</h1>");
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", 'client', "build", "index.html"));
});


// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000, http://localhost:5000");
});