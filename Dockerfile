FROM node:current-buster

WORKDIR /app
COPY . /app

RUN npm install

CMD [ "node", "bot.js" ]