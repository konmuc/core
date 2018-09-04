FROM node:8.11.4

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8088

CMD [ "npm", "start" ]