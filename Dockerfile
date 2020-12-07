FROM node:13
MAINTAINER woungsub1234@gmail.com 

ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \  
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY /src/package.json .
RUN npm install

COPY . .
RUN cd /src
WORKDIR /src


RUN chmod =X docker-entrypoint.sh
ENTRYPOINT ./docker-entrypoint.sh

EXPOSE 3000