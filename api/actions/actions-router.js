const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        if (!actions) {
            console.log('middleware 404 here')
        } else {
            res.status(200).json(actions)
        }
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message })
})

module.exports = router