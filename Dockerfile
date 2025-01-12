# Step 1: Choose the base image (Node.js)
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock if using yarn)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port that your app will run on (default for Express is 3000)
EXPOSE 3000

# Step 7: Set the command to start the app
CMD ["npm", "start"]
