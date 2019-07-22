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

router.get('/:id', (req, res, next) => {
  let streetArtID = req.params.id
  StreetArt.findById(streetArtID)
    .then(StreetArts => {
      res.json(StreetArts)
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
  let pictureUrl = req.file.url
  let location = coordinates[(lat, lng)]

  StreetArt.create({
    pictureUrl: pictureUrl,
    location: location,
  })
    .then(StreetArt => {
      res.json({
        success: true,
        StreetArt,
      })
    })
    .catch(err => next(err))
})

module.exports = router
