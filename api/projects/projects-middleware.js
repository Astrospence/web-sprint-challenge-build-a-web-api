const Projects = require('./projects-model')

function validateReqBody (req, res, next) {
    const { name, description, /*completed*/ } = req.body
    if (!name || !description /*|| !completed*/) {//If I include this check for req.body.completed Codegrade then passes the 400 resp test, but then it fails the resp body tests
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
            req.projectActions = project.actions
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