#alpine image
FROM nginx:alpine

# create the server and location configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# copies the build app to the default location
COPY dist /usr/share/nginx/html