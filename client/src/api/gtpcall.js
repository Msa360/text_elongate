import axios from "axios";


function sendText(text, callback) {
    axios.post("http://localhost:5000/api/textinsert", {
        "text": text
      }, { headers: {"Content-Type": "application/json", "Authorization": "GeoHot"} })
    .then(function (resp) {
        callback(resp);
      })
      .catch(function (error) {
        callback(error);
      });
    
}

export default sendText