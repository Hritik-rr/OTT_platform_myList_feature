![Screenshot 2024-05-30 121211](https://github.com/Hritik-rr/STAGE_OTT_myList_feature/assets/41600508/dee40d05-da69-481e-b4e5-09fe2cd383b3)# STAGE_OTT_myList_feature

<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<div align="center">
<h3 align="center">Setup & Jumpstart</h3>
  <br />
<p>The “My List” feature enhances our OTT platform by allowing users to save their favorite movies and TV shows to a personalized list. This feature requires backend services for managing the user’s list, including adding, removing, and listing saved items.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
## 🚩 Table of Contents

- [Getting Started & Setup](#-Getting-Started-&-Setup)  
- [Prerequisites](#-prerequisites)  
- [Installation](#-installation)  
- [Scripts](#-scripts)  
- [Routes](#-routes)  
- [Additional Information](#-additional-information)  <br />
<br />



<!-- ABOUT THE PROJECT -->
## 🔧 Getting Started & Setup 

This section provides step-by-step instructions on how to set up the backend service locally for development and testing purposes. Follow these guidelines to get your environment ready for implementing the “My List” feature. The Project uses Typescript language using ExpressJS Framework. For Database purposes, we are using MongoDB and for relational modeling and ORM purposes, Mongoose is used.

### Prerequisites

For package manager, npm is used in the project, so it is required that you must have npm on your system.
* npm
  ```sh
  ~ npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Setting up API Key [Coming soon: jump to step 2 for now]
   <br />
   
3. Clone the repo
   ```sh
   ~ git clone https://github.com/your_username_/Project-Name.git
   ```
4. Install NPM packages
   ```sh
   ~ npm install
   ```
5. Setting up the MongoDB database
    * ***Go thru this link*** : [*Connect MongoDB Atlas with NodeJS Express Backend*](https://medium.com/@sawepeter6/how-to-connect-mongodb-atlas-with-nodejs-express-backend-879cfb312af8)
      <h3>OR</h3> 
    **Follow the steps below:** 
    * **Sign-up** : If you don’t have one already, sign up for a MongoDB Cloud account.
    * **Create a New Project** : Go to MongoDB Altas, create a new project for your application.
    * **Create a New Atlas Cluster** : Set up a new cluster within your project.
    * **Create a Database User** : Configure a MongoDB user for your cluster. Assign appropriate roles and permissions to this user.
    * **Connect to the Cluster** : Use the connection string provided by MongoDB Atlas to connect your application to the cluster.
        * Sample connection string:
        * `mongodb+srv://<UserName>:<Password>@<Mongo_endpoint>/?retryWrites=true&w=majority&appName=<Cluster_Name>`
<br /> 

6. Establishing the connection using the connection string(MongoDB_URI).
   * Create a .env file in the root directory for storing the configuration setting and environment variables.
     <br />
     
   ```js
    PORT=3000
    MONGODB_URI = mongodb+srv://<UserName>:<Password>@<Mongo_endpoint>/?retryWrites=true&w=majority&appName=<Cluster_Name>
   ```
   > Note: I am using the PORT 3000 for listening to the requests, any other port can also be used. 
<br/>

 7. Populating the Database using scripts.
    * Now that our project setup and complete and we have established a connection with MongoDB, now we will use some sample data scripts to populate the database.
    > Note: If you use this command for the first time, populating the database might take a few minutes.
    <br />
    
    * In the root terminal of your project, use the script :
      ```sh
      ~ npm run populateAll
      ```
    * This command will establish a MongoDB connection, create collections `tvShow`, `movies` & `users` and populate data within in.
      ![Populating data in different collections](https://github.com/Hritik-rr/STAGE_OTT_myList_feature/assets/41600508/e347802c-d6cf-4640-948c-5219d232da0e)
    
    
    * This is what your MongoDB cluster would look like after running the data script:
      ![MongoDB Cluster](https://github.com/Hritik-rr/STAGE_OTT_myList_feature/assets/41600508/1d0b96d4-5739-4168-bda6-ba8db168f64e)

      
<br />


<!-- TABLE OF CONTENTS -->
## 📝 Scripts

| Script | Description |
| --- | --- |
| `~npm run build`   | Build command: this command will transpile the TS code and create and update the build folder by the name of ***/dist***  |
| `~npm run dev`   | Runs the application in development mode with nodemon, watching for changes in TypeScript files and restarting automatically. |
| `~npm run start`   | Runs the main application using ts-node |
| `~npm run test`   | Runs all the tests suites under the test plan using jest and supertest |
| `~npm run populateTvShow`   | Executes a script to populate the `tvShows` collection into the database |
| `~npm run populateMovies`   | Executes a script to populate the `movies` collection into the database |
| `~npm run populateUser`   | Executes a script to populate the `users` collection into the database |
| `~npm run populateAll`   | Runs the populateTvShow, populateMovies, and populateUsers scripts sequentially to populate all data into the database. |
<br />


<!-- TABLE OF CONTENTS -->
## 📍 Routes 
<p> Having completed the project setup, you now possess the entire updated codebase. You can proceed by running the application and thoroughly testing the available routes</p>
Before starting up with the routes, just make sure to run the commands below.

```sh
~npm run build
~npm run dev
```
<br /> 

| Routes | What it does |
| --- | --- |
| *Add to My List* <br /> `/users/modifyMyList/:userId` | ***PATCH REQUEST***: Modifying the code in user Collection to update *myList* or *watchHistory* array data (Because while populating the collection using script, it creates a new user, so it remains empty) <br/> Note : data input as json has to be passed <br /> ```{"itemId": "665709ba93da0b6486c573ed", "itemType": "Movies"}```<br /> `itemId` is the `objectId` from movies collection |
| *List My Items By User* <br /> `/users/myUsers/:userId` | ***GET REQUEST***: Fetching the myList data for a specific user(Pagination handled). |
| *List My Items All Users* <br /> `/users/modifyMyList/` | ***GET REQUEST***: Just by removing the userId from the endpoint, it fetches the myList data for all the users(Pagination handled). |
| *Delete from My List* <br /> `/users/modifyMyList/:userId` | ***DELETE REQUEST***: Modifying the code in user Collection to delete data from *myList* or *watchHistory* array data <br/> Note : data input as json has to be passed <br /> ```{"itemId": "665709ba93da0b6486c573ed", "itemType": "Movies"}```<br /> `itemId` is the `objectId` from movies collection | 
| *Add New Movies* <br /> `/movies` | ***POST REQUEST***: Adding data in the movies collection. This is already handled using the data script, but if one wants to add specific data input in the movies collection, this can get the job done. |
| *Add New TV Shows* <br /> `/tvShows` | ***POST REQUEST***: Adding data in the tvShows collection. This is already handled using the data script, but if one wants to add specific data input in the tvShows collection, this can get the job done. |
| *Add New Users* <br /> `/users/addNewUsers` | ***POST REQUEST***: Adding data in the users collection. This is already handled using the data script, but if one wants to add specific data input in the users collection, this can get the job done. *Note: New users cannot have watchHistory or myList data, that has to be created using the `Add to My List` endpoint.* |
<br />


<!-- TABLE OF CONTENTS -->
## 📄 Additional Information
1. For any information about endpoints, CI/CD or design decision I made, you can go through this [**Video Explanation**](https://www.loom.com/share/1034cc77e0db447a9078ca3a26ea6c45?sid=4889bb49-70cd-4711-bac1-03b8459fcb3c) where I have given a brief about the code base.
2. The high number of commits in this repository is primarily due to extensive testing of GitHub Actions for deploying the code on an EC2 instance using Nginx. As this was my first experience with Nginx, I wanted to ensure a robust deployment process.



<p align="right">(<a href="#readme-top">back to top</a>)</p>
