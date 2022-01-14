const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => {
        if (!projects) {
            res.status(200).json([])
        } else {
            res.status(200).json(projects)
        }
    })
    .catch(next)
})

router.get('/:id', async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            res.status(404).json({ message: 'No project with specified id'})
        } else {
            res.status(200).json(project)
        }
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        if (!req.body.name || !req.body.description) {
            res.status(400).json({ message: 'Please provide name and description'})
        } else {
            const newProject = await Projects.insert(req.body)
            res.status(200).json(newProject)
        }
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message })
})

module.exports = router