FROM node:18-alpine

# Set work directory.
RUN mkdir /code
WORKDIR /code

COPY . /code/

RUN npm install

CMD ["npm", "start"]
