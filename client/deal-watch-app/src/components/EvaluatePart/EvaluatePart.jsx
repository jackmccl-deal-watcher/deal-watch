import './EvaluatePart.css'
import { useState, useContext } from 'react'
import { test_cpu } from '../../tests/test_parts'
import { evaluatePart } from '../../utils/ApiUtils'
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect } from 'react';

const EvaluatePart = () => {
    const [evaluationData, setEvaluationData] = useState([])

    const getPartEvaluation = async () => {
        try {
            const partEvaluation = await evaluatePart(test_cpu)
            console.log(partEvaluation[0])
            setEvaluationData(partEvaluation[0])
        } catch (error) {
            console.error('Error evaluating part:', error)
        }
    }

    const updateGraph = async () => {
        await getPartEvaluation()
    }

    useEffect( () => {
        updateGraph()
    }, [])

    return(
        <div className='evaluatepart'>
            <button onClick={updateGraph}>Reload evaluation</button>
            <div className='evaluation'>
                <LineChart
                    // xAxis={[{ data: evaluationData.data_points.time_data }]}
                    // series={[{ data: evaluationData.data_points.price_data }]}
                    xAxis={[{ 
                        data: [new Date('2025-06-04'), new Date('2025-06-03'), new Date('2025-06-02'), new Date('2025-06-01')], 
                        scaleType: 'time',
                    }]}
                    series={[{ data: [1,2,null, 3], connectNulls: true }, { data: [1.5,2.5,3.5]}]}
                />
            </div>
        </div>
    )
}

export default EvaluatePart