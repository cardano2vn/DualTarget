FROM node:20
WORKDIR /usr/src/docker
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3500
CMD ["npm", "start"]