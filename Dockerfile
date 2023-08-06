#Stage 1
FROM node:19-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . /app 
RUN npm run build

#Stage 2    
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 
