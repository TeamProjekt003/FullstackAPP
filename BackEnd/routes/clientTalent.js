const express = require('express')
const router = express.Router()

const {addClientTalent,getClientTalents} = require('../controllers/clientTalent.js')

router.get('/getAll', getClientTalents)
router.post('/add', addClientTalent)

module.exports = router