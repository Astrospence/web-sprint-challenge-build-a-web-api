const Actions = require('./actions-model')

function validateReqBody (req, res, next) {
    const { project_id, description, notes } = req.body
    if (!project_id || !description || !notes) {
        next({ status: 400, message: 'Please provide a project id, description, and notes' })
    } else {
        next()
    }
}

async function validateId (req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            next({ status: 404, message: `No action with id: ${req.params.id}` })
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
    validateId,
}