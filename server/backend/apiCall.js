const axios = require("axios");
require('dotenv').config(); // for .env vars


function splitText(rawText) {
    return rawText.split("[insert]"); 
}

function assembleText(textArray, callback) {
    // textArray.length -1 because we don't want the last suffix 
    for (let i = 0; i < textArray.length-1; i++) {
        var prefix = "";
        var suffix = "";
        for (let j = 0; j < textArray.length; j++) {
            if (j <= i) { prefix += textArray[j]; }
            else { suffix += textArray[j]; }
        }
        gptProcessText(prefix, suffix, r => {
            
        })
    }
}

function gptProcessText(prefix, suffix, callback) {
    const token = process.env.SECRET
    axios.post("https://api.openai.com/v1/completions", {
        "model": "text-davinci-003",
        "prompt": prefix,
        "suffix": suffix,
        "temperature": 0.7,
        "max_tokens": 256,
        "top_p": 1,
        "frequency_penalty": 1.01,
        "presence_penalty": 0.66
    }, { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`} })
    .then(function (resp) {
        callback(resp);
    })
    .catch(function (error) {
        callback(error);
    });
}



module.exports = { gptProcessText, splitText }