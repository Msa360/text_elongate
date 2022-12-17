const express = require("express");
const path = require("path");
const toolkit = require("./backend/apiCall") // Preprocess for text

testtext = "this [insert] is a text[insert] for my essay[insert] yes."
toolkit.makeInsertions(testtext);

// ewfewfewfew;

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post("/api/textinsert", (req, res) => {
    // todo make api call to openai to add inserts
    if (req.headers['authorization'] === "GeoHot") {
      toolkit.gptProcessText("Albert Einstein was", "a scientist", 30, (resp) => {
        res.send(resp.data.choices[0].text);
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
PORT = 5000
app.listen(PORT, () => {
  console.log("server started on port "+PORT+", http://localhost:"+PORT);
});