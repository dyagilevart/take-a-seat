FROM node:10-alpine as builder

RUN npm install

RUN npm run build
