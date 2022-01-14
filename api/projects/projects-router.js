const express = require('express')
const Projects = require('./projects-model')
const Actions = require('../actions/actions-model')
const { validateReqBody, validateId } = require('./projects-middleware')
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

router.get('/:id', validateId, async (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateReqBody, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body)
        res.status(200).json(newProject)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateReqBody, validateId, async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body)
        console.log(updatedProject)
        res.status(200).json(updatedProject)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        next({ status: 200 })
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateId, async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id)
        res.status(200).json(project.actions)
    } catch (err) {
        next(err)
    }
})

module.exports = router