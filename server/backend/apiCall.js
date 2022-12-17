const axios = require("axios");
require('dotenv').config(); // for .env vars


function makeInsertions(rawText, maxTok=3) {
    assembleText(splitText(rawText), maxTok);
}

function splitText(rawText) {
    return rawText.split("[insert]"); 
}

function assembleText(textArray, maxTok) {

    if (textArray.length === 1) {
        console.log("stop");
        console.log(textArray[0]);
        return textArray[0];
    }
    var prefixRaw = ""; // without the [insert] tag
    var prefix = "";
    var suffix = "";
    var suffixArray = [];
    for (let i = 0; i < textArray.length; i++) {
        if (i === 0) { 
            prefixRaw += textArray[i];
        } else { 
            suffix += textArray[i]; 
            suffixArray.push(textArray[i]);
        }
    }
    prefix = prefixRaw + "[insert]"; // add insert tag at the end of prefix 

    gptProcessText(prefix, suffix, maxTok, (resp) => {
        
        var newData = resp.data.choices[0].text;

        if (suffixArray.length === 1) {
            var newARR = [ prefixRaw + newData + suffixArray[0] ];
        } else {
            var newARR = [ prefixRaw + newData + suffixArray[0] ].concat(suffixArray.slice(1));
        }
        
        assembleText(newARR, maxTok);
    })
}

function gptProcessText(prefix, suffix, maxTok=150, callback) {
    const token = process.env.SECRET
    axios.post("https://api.openai.com/v1/completions", {
        "model": "text-davinci-003",
        "prompt": prefix,
        "suffix": suffix,
        "temperature": 0.7,
        "max_tokens": maxTok,
        "top_p": 1,
        "frequency_penalty": 1.01,
        "presence_penalty": 0.66
    }, { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`} })
    .then(function (resp) {
        callback(resp);
    })
    .catch(function (error) {
        callback(error);
        console.log(error)
    });
}



module.exports = { makeInsertions, gptProcessText, splitText }