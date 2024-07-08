const express = require('express')
const router = express.Router()

const {addClientTalent,getClientTalents,getClient} = require('../controllers/clientTalent.js')

router.get('/getAll', getClientTalents)
router.post('/add', addClientTalent)
router.get('/getAllTalent',getClient)

module.exports = router