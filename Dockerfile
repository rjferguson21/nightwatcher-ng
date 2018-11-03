FROM node:9 as builder

RUN npm -g install npm

WORKDIR /usr/workroot/

COPY package*.json ./

RUN npm install

COPY . .

RUN npx ng build --prod 

# alpine image
FROM nginx:alpine

# create the server and location configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# copies the build app to the default location
COPY --from=builder /usr/workroot/dist /usr/share/nginx/html