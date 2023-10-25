FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm install --save-dev @types/node
RUN npm install -g typescript
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
