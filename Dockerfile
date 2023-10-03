FROM node:18-alpine

WORKDIR /frontend

# COPY package*.json ./
COPY . .
RUN yarn install



EXPOSE 3002

CMD ["yarn" , "next-start"]