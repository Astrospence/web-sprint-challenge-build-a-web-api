const express = require('express')
const Actions = require('./actions-model')
const { validateReqBody, validateId } = require('./actions-middlware')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        if (!actions) {
            next({ status: 404, message: 'No actions found' })
        } else {
            res.status(200).json(actions)
        }
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateId, (req, res) => {
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

router.put('/:id', validateReqBody, validateId, async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body)
        res.status(200).json(updatedAction)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        next({ status: 200 })
    } catch (err) {
        next(err)
    }
})

module.exports = router