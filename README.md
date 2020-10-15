# CelebrityGram

Today you'll be building an app for viewing, liking, and commenting on a single picture. You will be using a local API and building out the frontend for our app, CelebrityGram. Give yourself 90 minutes to complete this challenge, there are no tests - you will have to prove your code through functional deliverables.

## Demo

Use this gif as an example of how the app should work.

![demo gif](assets/demo.gif)

## Setup

- Fork and clone this repository
- Run `json-server --watch db.json --routes routes.json` to get the backend started
- Open the `index.html` file on your browser

## Endpoints

Your base URL for your API will be: http://localhost:3000

The endpoints you will need for Core Deliverables are:

- GET `/images/1`
- PATCH `/images/1`
- POST `/comments`

## Core Deliverables

As a user, I can:

- See the image received from the server, including its title, likes and comments when the page loads
- Click on the heart icon to increase image likes, and still see them when I reload the page
- Add a comment (no persistance needed)

## Advanced Deliverables

The additional endpoints you will need for Advanced Deliverables are:

- DELETE `/comments/:id`

As a user, I can:

- Still see the comments written after reloading the page
  > For this one, you want to make a POST request to the `/comments` endpoint.
  > Your comment object must have an `imageId` key with a value of `1` for it to work.
- Delete a comment
  > To persist this, you will have to make a DELETE request to the `/comments/:id` endpoint.
- Dislike an image (Create a new button to do this)