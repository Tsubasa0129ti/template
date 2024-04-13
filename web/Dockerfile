FROM node:21.7.1-bullseye-slim
WORKDIR /app

COPY yarn.lock package.json .yarnrc.yml .
COPY .yarn/ ./.yarn/
RUN yarn install

COPY . .
CMD yarn run ${NODE_ENV}
