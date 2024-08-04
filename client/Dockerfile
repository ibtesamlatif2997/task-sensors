FROM node:18-alpine

RUN apk --no-cache --update add dumb-init vim nano bash curl && \
    rm -rf /var/cache/apk/* /tmp && \
    mkdir /tmp && \
    chmod 777 /tmp

# Set work directory.
RUN mkdir /code
WORKDIR /code

COPY . /code/

RUN npm install

RUN npm install -g serve

CMD ["npm", "start"]
