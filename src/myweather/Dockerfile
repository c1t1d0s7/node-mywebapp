ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine
# ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . .
RUN npm install
USER node
CMD [ "npm", "start" ]
EXPOSE 3000
