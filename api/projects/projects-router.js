const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        if (!projects) {
            console.log('nothin here')
        } else {
            console.log('here is the list')
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

module.exports = router