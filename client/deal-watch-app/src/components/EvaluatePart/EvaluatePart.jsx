import './EvaluatePart.css'
import { useState, useContext } from 'react'
import { test_cpu } from '../../tests/test_parts'
import { evaluatePart } from '../../utils/ApiUtils'
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect } from 'react';
import { ScatterChart } from '@mui/x-charts';

const EvaluatePart = () => {
    const [evaluationData, setEvaluationData] = useState([])
    const [loading, setLoading] = useState(true)

    const getPartEvaluation = async () => {
        try {
            const partEvaluation = await evaluatePart(test_cpu)
            setEvaluationData(partEvaluation)
            console.log(partEvaluation)
            setLoading(false)
        } catch (error) {
            console.error('Error evaluating part:', error)
        }
    }

    const updateGraph = async () => {
        setLoading(true)
        await getPartEvaluation()
    }

    const fixPointDates = () => {
        const fixedPoints = evaluationData.X_Y_Points.map((X_Y_Point) => {
            const data = X_Y_Point.data.map( (X_Y_Point_data) => {
                return {x: new Date(X_Y_Point_data.x), y: X_Y_Point_data.y, id: X_Y_Point_data.id}
            })
            X_Y_Point.data = data
            return X_Y_Point
        })
        return fixedPoints
    }

    const displayLineChart = () => {
        return(
            <LineChart
                height={1000}
                xAxis={[{ 
                    data: evaluationData.X_Data.map((time) => new Date(time)), 
                    scaleType: 'time',
                    zoom: true,
                }]}
                yAxis={[{
                    zoom: true,
                }]}
                series={evaluationData.Y_Data}
            />
        )
    }

    const displayScatterChart = () => {
        return (
            <ScatterChart
                height={1000}
                xAxis={[{
                    scaleType: 'time',
                }]}
                series={fixPointDates()}
                grid={{ vertical: true, horizontal: true }}
            />
        )
    }

    useEffect( () => {
        updateGraph()
    }, [])

    return(
        <div className='evaluatepart'>
            <button onClick={updateGraph}>Reload evaluation</button>
            <div className='evaluation'>
                { !loading && evaluationData.X_Data && evaluationData.Y_Data && evaluationData.X_Y_Points ?
                    displayScatterChart() :   <div>Loading evaluation...</div>
                }
            </div>
        </div>
    )
}

export default EvaluatePart