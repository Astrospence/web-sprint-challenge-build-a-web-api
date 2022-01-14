const express = require('express')
const Actions = require('./actions-model')
const { validateReqBody, idNotFound } = require('./actions-middlware')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        if (!actions) {
            res.status(404).json({ message: 'No actions available'})
        } else {
            res.status(200).json(actions)
        }
    } catch (err) {
        next(err)
    }
})

router.get('/:id', idNotFound, (req, res) => {
        res.status(200).json(req.action)
})

router.post('/', validateReqBody, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(200).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        if (!req.body.name || !req.body.description || !req.body.completed) {
            console.log('400 error here')
        } else {
            const updatedAction = await Actions.update(req.params.id, req.body)
            if (!updatedAction) {
                res.status(404).json({ message: 'No action with specified id'})
            } else {
                res.status(200).json(updatedAction)
            }
        }
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedAction = await Actions.remove(req.params.id)
        if (!deletedAction) {
            res.status(404).json({ message: 'No action with specified id'})
        } else {
            res.status(200)
        }
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message })
})

module.exports = router