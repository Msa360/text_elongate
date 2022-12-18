const axios = require("axios");
require('dotenv').config(); // for .env vars
const SITE_TAG = "(insert)"; // tag home made 
const GPT_TAG = "[insert]"; // tag for insertions from openai

// this is the final function to call in server, that handle multiple insert tags
function makeInsertions(rawText, maxTok=10, isAuto, callback) {
    var taggedText = isAuto ? addTags(rawText) : rawText;
    // if (isAuto) {var taggedText = addTags(rawText);} else { var taggedText = rawText;}
    assembleText(splitText(taggedText), maxTok, callback);
}


function addTags(rawText) {
    var index = rawText.search(". ");
    // todo: add SITE_TAG to random but plausible places in the rawText and return tagged text
    return rawText;
}

function splitText(taggedText) {
    return taggedText.split(SITE_TAG); 
}

function assembleText(textArray, maxTok, callback) {

    if (textArray.length === 1) {
        callback(textArray[0]);
        return;
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
    prefix = prefixRaw + GPT_TAG; // add insert tag at the end of prefix 

    gptProcessText(prefix, suffix, maxTok, (resp) => {
        console.log(resp.data)
        var newData = resp.data.choices[0].text;

        if (suffixArray.length === 1) {
            var newARR = [ prefixRaw + newData + suffixArray[0] ];
        } else {
            var newARR = [ prefixRaw + newData + suffixArray[0] ].concat(suffixArray.slice(1));
        }
        
        assembleText(newARR, maxTok, callback);
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
        "frequency_penalty": 1.51,
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