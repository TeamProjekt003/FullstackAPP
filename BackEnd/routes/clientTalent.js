const express = require('express')
const router = express.Router()

const {addClientTalent,getClientTalents,getClient,getFreelancersTalents,getOneFreelancersTalents} = require('../controllers/clientTalent.js')

router.get('/getAll', getClientTalents)
router.post('/add', addClientTalent)
router.get('/getAllTalent',getClient)
router.get('/getAllFreelancers',getFreelancersTalents)
router.get('/getAllFreelancers/:id',getOneFreelancersTalents)

module.exports = router