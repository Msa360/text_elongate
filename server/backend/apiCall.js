const axios = require("axios");
require('dotenv').config(); // for vars in .env file
const SITE_TAG = "(insert)"; // tag home made 
const GPT_TAG = "[insert]"; // tag for insertions from openai

// this is the final function to call in server, that handle multiple insert tags
function makeInsertions(rawText, maxTok=10, isAuto, density, callback) {
    if (isAuto) {
        var taggedText = addTags(rawText, density);
    } else {
        var taggedText = rawText;
    }
    assembleText(splitText(taggedText), maxTok, callback);
}

// here density is between 0...1
function addTags(rawText, density) {
    // Split the text into an array of words
    const words = rawText.split(' ');
    
    // Choose a random index to insert the word, and index is at least one so it never put text before.
    const max = Math.min(Math.round(density * 5), 5);
    const insertGap = Math.max(Math.floor(words.length / max), 1);
    for (let i = 1; i <= max; i += 1) {
        // Insert the tag at the chosen index
        words.splice(i * insertGap, 0, SITE_TAG);
    }
    console.log(words.join(' '));
    // Join the array of words back into a single string and return it
    return words.join(' ');
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

    gptProcessText(prefix, suffix, maxTok, (resp, err) => {
        if (err) {
            console.log("\x1b[31m"+"CRITICAL: an axios error happend with status code:", err.response.status, err.response.statusText)
            assembleText(["An error happened"], maxTok, callback)
        } else {
            var newData = resp.data.choices[0].text;
            console.log(resp.data)

            if (suffixArray.length === 1) {
                var newARR = [ prefixRaw + newData + suffixArray[0] ];
            } else {
                var newARR = [ prefixRaw + newData + suffixArray[0] ].concat(suffixArray.slice(1));
            }

            assembleText(newARR, maxTok, callback);
        }
    })
}

function gptProcessText(prefix, suffix, maxTok=200, callback) {
    const token = process.env.SECRET_API_KEY
    axios.post("https://api.openai.com/v1/completions", {
        "model": "text-davinci-003",
        "prompt": prefix,
        "suffix": suffix,
        "temperature": 0.7,
        "max_tokens": maxTok,
        "top_p": 1,
        "frequency_penalty": 1.50,
        "presence_penalty": 0.15
    }, { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`} })
    .then(function (resp) {
        callback(resp);
    })
    .catch(function (error) {
        callback("", error);
    });
}



module.exports = { makeInsertions }