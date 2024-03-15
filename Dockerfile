FROM node:latest as build
WORKDIR /usr/local/app
COPY . /usr/local/app/
RUN npm install
RUN npm run build

# Angular does't provide a prod web server
FROM nginx:latest
# Copy the webapp build files to nginx
COPY --from=build /usr/local/app/dist/mbyangular/browser /usr/share/nginx/html
# Copy the nginx config file to resolve broken refreshes
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
