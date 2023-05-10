# pull the Node.js Docker image - alpine is the lightest version
FROM node:alpine

# create the directory inside the container
RUN mkdir -p /usr/src/app

# set as the working directory
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY . .

# run build as this is a production docker image
RUN npm run build

# Expose port
EXPOSE 5000

# the command that starts the app
CMD ["npm", "start"]