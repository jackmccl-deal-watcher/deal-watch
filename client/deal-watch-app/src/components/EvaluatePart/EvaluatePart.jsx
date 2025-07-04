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
                return {
                    x: new Date(X_Y_Point_data.x), 
                    y: X_Y_Point_data.y, 
                }
            })
            X_Y_Point.data = data
            X_Y_Point.valueFormatter = (data) => {
                const date = new Date(data.x)
                return `(${convertDateToMonthDayYear(data.x)}, ${convertPriceToDollar(data.y)})`
            }
            return X_Y_Point
        })
        return fixedPoints
    }

    const convertPriceToDollar = (price) => {
        return new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(price)
    }

    const convertDateToMonthDay = (date) => {
        date = new Date(date)
        return `${date.getMonth()+1}/${date.getDate()}`
    }

    const convertDateToMonthDayYear = (date) => {
        date = new Date(date)
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
    }

    const displayScatterChart = () => {
        const WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000
        const MONTH_IN_MILLSECONDS = 30 * 24 * 60 * 60 * 1000
        return (
            <ScatterChart
                height={1000}
                yAxis={[{
                    valueFormatter: convertPriceToDollar,
                    width: 60,
                }]}
                xAxis={[{
                    scaleType: 'time',
                    valueFormatter: convertDateToMonthDay,
                    tickInterval: WEEK_IN_MILLISECONDS,
                    tickLabelInterval: MONTH_IN_MILLSECONDS,
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