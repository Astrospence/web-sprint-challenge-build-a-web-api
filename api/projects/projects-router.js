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
            res.status(400).json({ message: 'Please provide name and description' })
        } else {
            const newProject = await Projects.insert(req.body)
            res.status(200).json(newProject)
        }
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        if (!req.body.name || !req.body.description /*|| !req.body.completed*/) { 
            res.status(400).json({ message: 'Please provide name, description, and completed status' })
        } else {
            const updatedProject = await Projects.update(req.params.id, req.body)
            if (!updatedProject) {
                res.status(404).json({ message: 'No project with specified id'})
            } else {
                res.status(200).json(updatedProject)
            }
        }
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const deleted = await Projects.remove(req.params.id)
        if (!deleted) {
            res.status(404).json({ message: 'No project with specified id'})
        } else {
            res.status(200).json()
        }
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', async (req, res, next) => {
    try {
        const specifiedProject = await Projects.get(req.params.id)
        if (!specifiedProject) {
            res.status(404).json({ message: 'No project with specified id'})
        } else {
            res.status(200).json(specifiedProject.actions)
        }
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message })
})

module.exports = router