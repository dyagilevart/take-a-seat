FROM node:latest

WORKDIR /take-a-set
COPY package.json .
RUN npm install
COPY . .
CMD npm start