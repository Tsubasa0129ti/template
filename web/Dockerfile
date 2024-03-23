FROM node:21.7.1-bullseye-slim
WORKDIR /app
COPY . .
RUN yarn install
ARG NODE_ENV
CMD yarn run ${NODE_ENV}
