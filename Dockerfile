# Node latest stable version
FROM node

# Set working directory in container
WORKDIR /msweather

# Copy package.json and index.js to msweather folder
COPY package.json index.js .env /msweather/

# Copy server folder
COPY server /msweather/server

# Run npm commands
RUN npm install --production

# Expose port 3000
EXPOSE 3000

# Run App
CMD ["npm", "start"]



