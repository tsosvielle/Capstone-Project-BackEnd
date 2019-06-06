<<<<<<< HEAD
# Capstone-Project-BackEnd
The backend api for my general assembly capstone project
=======
# Conservator

## Description:
Conservator is a platform to let park, conservation officals and other relevant
scientific and government communities stay abreast of sightings of rare and
endangered flora and fauna. Users can anonymously post recent sightings for
dissemenation.

## Back end links:
[Github](https://github.com/tsosvielle/capstone-project-frontend)

## Project planning:
The project had a limited time frame and as such upfront planning was needed to
scope what could and couldn't be carried over from the initial vision to version
1. Down the road features (elaborated later) would include image posting and map
pinning. For v1 basic CRUD actions and user posting was the largest priority.

## V1 Functionality:
Users can view detailed information about sightings. Unsigned in users can view
a limited version of sightings limited to title and description. Users can
register accounts, changepasswords, and sign out. Signed in users can create,
update, and delete posts.

## Set up and Installation:
Upon forking cloning, and downloading both the front and back end of the App
 everything you need to create your own local version is built in. The back end should be functional at download but will need linking to whichever front end you've chosen.

## API Route Catalog:

### comments
| Verb    | URI Pattern            | Route Action                     |
|---------|------------------------|----------------------------------|
| POST    | `/sightings`           | `router.create(/sightings)`      |
| GET     | `/sightings`           | `router.index(/sightings)`       |
| GET     | `/sightings/:id`       | `router.show(/sightings/:id)`    |
| PATCH   | `/sightings/:id`       | `router.patch(/sightings/:id)`   |
| DELETE  | `/sightings/:id`       | `router.delete(/sightings/:id)`  |

### User
| Verb   | URI Pattern            | Controller#Action             |
|--------|------------------------|-------------------------------|
| POST   | `/sign-up`             | `users.post/sign-up`          |
| POST   | `/sign-in`             | `users.post/sign-in`          |
| PATCH  | `/change-password`     | `users.patch/change-password` |
| DELETE | `/sign-out`            | `users.delete/sign-out`       |


## User Stories:
- As a unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a unregistered user, I would like to see some version of sighting posts.
- As a signed in user, I would to create sightings.
- As a signed in user, I would to update my sightings.
- As a signed in user, I would to delete my sightings.

## Wireframe

[wireframe]()

### Technologies Used:
- html
- css
- javascript
- jquery
- react
- mongoDB
- mongoose
- express API
- boootstrap
- handlebars

### Unsolved problems and Future plans:
- Future iterations should have a search feature
- Future iterations should allow a user to mark a location pin where the sighting occured
- Future iterations should allow a user to include a photo if available.
>>>>>>> Add readme for backend
