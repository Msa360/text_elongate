# This is a website that inserts words in your essays
Increment your word count up to 2x with the help of GPT-3 ai model. The AI will smartly integrate phrases inside your text. Perfect if you wrote an essay and didn't reach the minimum word limit.
## How it works
The website uses React for the front-end and node/express for the back-end.
## Contributing
Fork the repository, make your changes and make a pull request.
To build the app:
```shell
git clone https://github.com/Msa360/text_elongate.git
cd text_elongate/client
npm install
npm run build
cd ../server
npm install
```
To start the local server:
```shell
cd text_elongate/server
node index.js
```
To start the local server with nodemon:
```shell
cd text_elongate/server
npm run start
```
This will start a server at <http://localhost:5000>.

If you are not running on your local machine make sure to change **proxy** in **client/package.json**
```json
"proxy": "https:yourdomain.com"
```
or if you don't have a domain put ip address with port:
```json
"proxy": "http:123.456.78.910:8080"
```

After making changes to files in **/client**, make sure to run **`npm run build`** in this directory since the server uses this final build else it will not update.