FROM node:14

WORKDIR /text_enhance

COPY . .

# installing dependencies for client
RUN cd ./client && npm install && npm run build

WORKDIR /text_enhance/server

# installing dependencies for server
RUN npm install 

ENV PORT=8080

ENV SECRET_API_KEY=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

EXPOSE 8080

CMD [ "node", "index.js" ]

