const express = require("express");
const path = require("path");
const gpi = require("./backend/apiCall") // GPT-API => GPI | Preprocess for text



const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post("/api/textinsert", (req, res) => {
    // todo make api call to openai to add inserts
    if (req.headers['authorization'] === "GeoHot") {
      gpi.makeInsertions(req.body.text, 60, req.body.isAuto, (processed) => {
        res.send(processed);
      }
      )
    } else {
      res.send("To use the api, visit our website api section");
    }
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", 'client', "build", "index.html"));
});


// start express server on port 5000
PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("server started on port "+PORT+", http://localhost:"+PORT);
});