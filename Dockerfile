#version of node to use
FROM node:20

#Directory to save image
WORKDIR /app

#iInstall app dependancies
# A wildcard is used to ensure that both pachage and pachage-lock are copied
COPY package*.json ./
RUN npm install

# Copy all files to /app
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]