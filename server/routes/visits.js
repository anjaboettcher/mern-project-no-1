const express = require('express')
const StreetArt = require('../models/StreetArt')
const Visit = require('../models/Visit')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

// Route protected for logged in user
router.get('/my-visits', isLoggedIn, (req, res, next) => {
  Visit.find({ _user: req.user._id })
    .populate('_streetArt')
    .populate('_user')
    .then(visit => {
      res.json(visit)
    })
    .catch(err => next(err))
})

router.post('/visits', isLoggedIn, (req, res, next) => {
  let _user = req.user._id
  let { _streetArt } = req.body
  Visit.create({ _user, _streetArt })
    .then(visit => {
      res.json({
        success: true,
        visit,
      })
    })
    .catch(err => next(err))
})

router.delete('/visits/:visitId', isLoggedIn, (req, res, next) => {
  let visitId = req.params.visitId
  Visit.findById(visitId).then(visit => {
    if (String(visit._user) === String(req.user._id)) {
      Visit.findByIdAndDelete(visitId).then(visit => {
        res.json({ message: 'Your visit has been successfully erased!' })
      })
    }
  })
})

module.exports = router
