FROM node:18
# Create app directory
WORKDIR /user/src/app

# install dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["node", "src/server.js"]
