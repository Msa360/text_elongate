FROM node:14

WORKDIR /text_enhance

COPY . .

RUN cd ./client && npm install && npm run build

WORKDIR /text_enhance/server

RUN npm install 

ENV PORT=8080

EXPOSE 8080

CMD [ "node", "index.js" ]

