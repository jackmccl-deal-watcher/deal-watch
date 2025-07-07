import './EvaluatePart.css'
import { useState } from 'react'
import { evaluatePart } from '../../utils/ApiUtils'
import ComponentForm from './ComponentForm';
import EvaluationScatterChart from './EvaluationScatterChart';

const EvaluatePart = () => {
    const [evaluationData, setEvaluationData] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')

    const getPartEvaluation = async (part) => {
        try {
            setMessage("Loading...")
            const response = await evaluatePart(part)
            switch (response.status) {
                case 'success':
                    setEvaluationData(response.evaluationData)
                    setLoading(false)
                    setMessage('')
                    break
                case 'error':
                    setMessage(response.message)
                    break
            }
        } catch (error) {
            console.error('Error getting part evaluation:', error)
        }
    }

    return(
        <div className='evaluatepart'>
            <ComponentForm handlePartEvaluation={getPartEvaluation}/>
            <p className='evaluatepart-message'>{message}</p>
            <div className='evaluation'>
                { !loading && evaluationData.X_Y_Points && evaluationData.M_A_Points ?
                    <EvaluationScatterChart evaluationData={evaluationData}/> : null
                }
            </div>
        </div>
    )
}

export default EvaluatePart