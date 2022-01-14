const Actions = require('./actions-model')

function validateReqBody (req, res, next) {
    const { project_id, description, notes } = req.body
    if (!project_id || !description || !notes) {
        next({ status: 400, message: 'Please provide a project id, description, and notes' })
    } else {
        next()
    }
}

async function idNotFound (req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            res.status(404).json({ message: 'No action with specified id'})
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    validateReqBody,
    idNotFound,
}