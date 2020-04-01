FROM ubuntu:18.04

# Install curl
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -

# Insall node js
RUN apt-get install -y nodejs

RUN apt-get install -y build-essential

# Make node js code directory
WORKDIR /code

# Install nodemon
RUN npm install -g nodemon@2.0.2

# copy 
COPY package.json /code/package.json

# Install dependent package
RUN npm install && npm ls

EXPOSE 13000
COPY . /code

RUN mv /code/node_modules /node_modules

CMD ["npm", "start"]