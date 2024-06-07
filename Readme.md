# Bidding API 

This is the assignment project in which I have build the whole backend using node JS, Prisma ORM, Postgres DB, express JS, Multer, Socket.io, with all the best practices data validation, exception handling and Much more.


## APIs EndPoint

Please look at this postman detailed documentation which I have created for you with all the details request body, expected response, <strong>Authorization</strong> header if route is restricted to only Authenticated User. 

Please follow below link:

<a href='https://documenter.getpostman.com/view/28914964/2sA3XJjjXZ' target='__blank'>https://documenter.getpostman.com/view/28914964/2sA3XJjjXZ</a>

## How to Setup Project locally?

- Clone this repo.
- Run command `npm i` in the command prompt (cmd)
- After all the dependencies install time to setup environment.
- Create .env file in root directory and put all the configurations as below:

Nte - I have provided .env variables on rmail please check 

- Now, run project using `npm start`

Wish you like the project

## Features Implemented

- Used Node JS and Express to create the API
- Used Socket.io for real time communication.
- Used Postgresql for database and Prisma ORM database is remote so no need to setup database locally only put the connection string in the .env
- Created User Schema
- Created Item Schema
- Created Bid Scehma
- Created Notification Schema
- Created API routes for user, item, bids, notifications
- Establish a web socket connection using socket.io library whenever a bid is created by any user a action is emit named `notify` from the server which is sending notification to all connected clients. the clients keep watching on this `notify` event when it happen they take the data message sending with action.
- Used JWT Authentication and Authorization. Implemented role based access. restrict the user from unauthorized routes.
- Protect POst, Put, Delete routes appropriately using middlewares.
- Validate incoming data for required fields.
- Handle and return appropriate HTTP status codes and messages for errors (e.g., 400 for bad requests, 401 for
unauthorized, 403 for forbidden).
- Implement image upload functionality for auction items using a library multer.
- Store image URLs in the database.
- Implement pagination for the GET /items endpoint.

## Folder Structure

Organized the project with a clear structure and seperating the bussiness logic and data access layer using repository pattern.

basically project is divided into four doamin user, item, bid, notiifcation.

- Seperate routes are created for each domain
- Seperate controllers are created for each domain
- Seperate repository are created for each domain

# Bonus

## Why I have integrated frontend

- It will give you a demonstration that I can Integrate and work also in the frontend also can create a normal good looking UI.
- Second thing in order to test the Socket.io the web socket connection becouse I have to notify the client (UI apps). Please you can also test the web socket connection using my UI next application. 

Below is the link of the UI repo and please follow the steps to setup UI written in the readme file of UI repo.





