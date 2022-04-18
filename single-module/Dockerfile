FROM node:14.18.1

WORKDIR /workspace

COPY package.json package-lock.json /workspace/

RUN npm install --silent --production

COPY . .

RUN npm run generate:prod

RUN npm run build

CMD ["npm", "run", "start:debug:prod"]
