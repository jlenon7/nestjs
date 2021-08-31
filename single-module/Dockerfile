FROM node:14.17.0

WORKDIR /workspace

COPY package.json yarn.lock /workspace/

RUN yarn install --silent --production --network-timeout 100000

COPY . .

RUN yarn build

CMD ["yarn", "start:debug:prod"]
