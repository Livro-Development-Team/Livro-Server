FROM node:13
MAINTAINER woungsub1234@gmail.com 
COPY . .
RUN cd /src
WORKDIR /src

RUN npm install
EXPOSE 3000

CMD npm start