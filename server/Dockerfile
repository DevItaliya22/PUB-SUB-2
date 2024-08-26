FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install dev dependencies (including TypeScript)
RUN npm install

# Install TypeScript globally (Optional)
RUN npm install -g typescript

COPY . .

# Run the TypeScript compiler
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]