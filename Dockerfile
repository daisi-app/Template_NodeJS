FROM node:latest

ADD . /app
WORKDIR /app
RUN npm install --production

EXPOSE 8080
CMD npm start
