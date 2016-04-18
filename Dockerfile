FROM mhart/alpine-node:latest

# Copy code
RUN mkdir /api
WORKDIR /api
ADD /api .

# Native Dependencies
RUN apk add --update make gcc g++ python

# Install modules
RUN npm install --production
RUN npm install -g nodemon

EXPOSE 3000

CMD ["npm", "start"]
