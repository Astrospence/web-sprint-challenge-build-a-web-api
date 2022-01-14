const Projects = require('./projects-model')

function validateReqBody (req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !description || !completed) {
        next({ status: 400, message: 'Please provide name, description, and completed status' })
    } else {
        next()
    }
}

async function validateId (req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            next({ status: 404, message: `No project with id: ${req.params.id}` })
        } else {
            req.project = project
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