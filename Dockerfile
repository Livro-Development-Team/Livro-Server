FROM node:13
MAINTAINER woungsub1234@gmail.com 
COPY . .
RUN npm install
EXPOSE 3000
WORKDIR /
CMD node index.js