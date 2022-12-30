FROM node:14

WORKDIR /text_enhance

COPY . .

# installing dependencies for client
RUN cd ./client && npm install && npm run build

WORKDIR /text_enhance/server

# installing dependencies for server
RUN npm install 

ENV PORT=8080

ARG api_key
ENV SECRET_API_KEY=$api_key

EXPOSE 8080

CMD [ "node", "index.js" ]

