import './EvaluatePart.css'
import { useState, useContext } from 'react'
import { test_cpu } from '../../tests/test_parts'
import { evaluatePart } from '../../utils/ApiUtils'

const EvaluatePart = () => {
    const [evaluation, setEvaluation] = useState({})

    const getPartEvaluation = async () => {
        try {
            const partEvaluation = await evaluatePart(test_cpu)
            setEvaluation(partEvaluation)
            console.log(partEvaluation)
        } catch (error) {
            console.error('Error evaluating part:', error)
        }
    }

    return(
        <div className='evaluatepart'>
            <button onClick={getPartEvaluation}>Reload evaluation</button>
            <div className='evaluation'>
                
            </div>
        </div>
    )
}

export default EvaluatePart