// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for sightings
const Sighting = require('../models/sighting')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { sighting: { title: '', text: 'foo' } } -> { sighting: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()
// const Comment = require('../models/comment')

// INDEX
// GET /sightings
router.get('/sightings', (req, res, next) => {
  Sighting.find()
    .populate('owner', 'email')
    .then(sightings => {
      return sightings.map(sighting => sighting.toObject())
    })
    .then(sightings => res.status(200).json({ sightings: sightings }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /sightings/
router.get('/sightings', (req, res, next) => {
  Sighting.findById(req.params.id)
    .then(handle404)
    .then(sightings => res.status(200).json({ sighting: sightings }))
    .catch(next)
})

// CREATE
// POST /sightings
router.post('/sightings', requireToken, (req, res, next) => {
  // set owner of new sighting to be current user
  req.body.sighting.owner = req.user.id

  Sighting.create(req.body.sighting)
    // respond to succesful `create` with status 201 and JSON of new "sighting"
    .then(sighting => {
      res.status(201).json({ sighting: sighting.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /sightings/
router.patch('/sightings/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.sighting.owner

  Sighting.findById(req.params.id)
    // .populate('id')
    .then(handle404)
    .then(sighting => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, sighting)

      // pass the result of Mongoose's `.update` to the next `.then`
      return sighting.update(req.body.sighting)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /sightings/
router.delete('/sightings/:id', requireToken, (req, res, next) => {
  Sighting.findById(req.params.id)
    .then(handle404)
    .then(sighting => {
      // throw an error if current user doesn't own `sighting`
      requireOwnership(req, sighting)
      // delete the sighting ONLY IF the above didn't throw
      sighting.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
