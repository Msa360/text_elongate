import axios from "axios";
require('dotenv').config(); // for .env vars


function preprocessText(rawText) {
    // const myArray = rawText.split("[insert]");

    // return [prefix, suffix]
}

function gptProcessText(text, callback) {
    const token = process.env.SECRET
    axios.post("https://api.openai.com/v1/completions", {
        "model": "text-davinci-003",
        "prompt": "Quantum science is the study of the behavior of matter and energy at the atomic and subatomic levels. It is a field of science that seeks to understand the nature of the universe on the smallest scales of space and time.\n\nQuantum science has revolutionized our understanding of the physical world. Its discoveries have been incorporated into our foundational understanding of materials, chemistry, biology, and astronomy. These discoveries are a valuable resource for innovation, giving rise to devices such as lasers and transistors, and enabling real progress on technologies once considered purely speculative, such as quantum computers. Physicists ",
        "suffix": " are exploring the potential of quantum science to transform our view of gravity and its connection to space and time. Quantum science may even reveal how everything in the universe (or in multiple universes) is connected to everything else through higher dimensions that our senses cannot comprehend.",
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

export { gptProcessText }