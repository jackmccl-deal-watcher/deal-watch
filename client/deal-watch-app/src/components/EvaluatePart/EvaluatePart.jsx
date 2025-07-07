import './EvaluatePart.css'
import { useState } from 'react'
import { evaluatePart } from '../../utils/ApiUtils'
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect } from 'react';
import { ScatterChart } from '@mui/x-charts';

import { useScatterSeries, useXScale, useYScale } from '@mui/x-charts/hooks';

// LinkPoints function from MUIX example
function LinkPoints({ seriesId, close }) {
    const scatter = useScatterSeries(seriesId);
    const xScale = useXScale();
    const yScale = useYScale();

    if (!scatter) {
        return null;
    }
    const { color, data } = scatter;

    if (!data) {
        return null;
    }

    return (
        <path
            fill="none"
            stroke={color}
            strokeWidth={10}
            d={`M ${data.map(({ x, y }) => `${xScale(x)}, ${yScale(y)}`).join(' L')}${
            close ? 'Z' : ''
            }`}
        />
        );
}

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