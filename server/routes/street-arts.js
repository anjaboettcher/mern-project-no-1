const express = require('express')
const router = express.Router()
const StreetArt = require('../models/StreetArt')
const uploader = require('../configs/cloudinary.js')

router.get('/', (req, res, next) => {
  StreetArt.find()
    .then(StreetArts => {
      res.json(StreetArts)
    })
    .catch(err => next(err))
})

router.get(`/:streetArtId`, (req, res, next) => {
  console.log('TESTTEST')
  let streetArtID = req.params.streetArtId
  StreetArt.findById(streetArtID)
    .then(StreetArt => {
      res.json(StreetArt)
    })
    .catch(err => next(err))
})

// router.post('/', (req, res, next) => {
//   let { lat, lng, picture } = req.body
//   StreetArt.create({ lat, lng, picture })
//     .then(StreetArt => {
//       res.json({
//         success: true,
//         StreetArt,
//       })
//     })
//     .catch(err => next(err))
// })

// Route to create a street art
// `uploader.single('picture')` parses the data send with the name `picture` and save information inside `req.file`

router.post('/', uploader.single('picture'), (req, res, next) => {
  let { lat, lng } = req.body
  let pic = req.file.url

  StreetArt.create({ location: { coordinates: [lat, lng] }, pictureUrl: pic })
    .then(StreetArt => {
      res.json({
        success: true,
        StreetArt,
      })
    })
    .catch(err => next(err))
})

module.exports = router
