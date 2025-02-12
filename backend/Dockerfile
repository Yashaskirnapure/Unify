FROM node:lts-alpine
ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --production --silent
COPY . .

RUN chown -R node:node /usr/src/app
EXPOSE 5000

USER node
CMD ["npm", "start"]