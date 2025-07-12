const express = require('express')
const { evaluatePart } = require('../modules/parts/EvaluatePart')
const { makeGraphData } = require('../modules/parts/EvaluationGraphs')

const router = express.Router()

router.post('/evaluate_part', async (req, res, next) => {
    try {
        const part = req.body
        const evaluation = await evaluatePart(part)
        const evaluationWithGraphData = makeGraphData(evaluation)
        res.status(200).json({ 'status': 'success', 'message': `${part.brand}: ${part.model} evaluation sucessfully completed!`, 'evaluationData': evaluationWithGraphData })
    } catch (error) {
        next(error)
    }
})

module.exports = router