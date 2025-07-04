import './EvaluatePart.css'
import { useState, useContext } from 'react'
import { test_cpu } from '../../tests/test_parts'
import { evaluatePart } from '../../utils/ApiUtils'
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect } from 'react';
import { ScatterChart } from '@mui/x-charts';

import { useScatterSeries, useXScale, useYScale } from '@mui/x-charts/hooks';

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
        const allPoints = [...evaluationData.X_Y_Points, evaluationData.M_A_Points]
        console.log(evaluationData.X_Y_Points)
        console.log(evaluationData.M_A_Points)
        const fixedPoints = allPoints.map((X_Y_Point) => {
            const data = X_Y_Point.data.map( (X_Y_Point_data) => {
                return {
                    x: new Date(X_Y_Point_data.x), 
                    y: X_Y_Point_data.y, 
                }
            })
            X_Y_Point.data = data
            X_Y_Point.valueFormatter = (data) => {
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
                    domainLimit: 'strict',
                }]}
                series={fixPointDates()}
                grid={{ vertical: true, horizontal: true }}
            >
                <LinkPoints seriesId="7-day-moving-average" />
            </ScatterChart>
        )
    }

    useEffect( () => {
        updateGraph()
    }, [])

    return(
        <div className='evaluatepart'>
            <button onClick={updateGraph}>Reload evaluation</button>
            <div className='evaluation'>
                { !loading && evaluationData.X_Y_Points && evaluationData.M_A_Points ?
                    displayScatterChart() :   <div>Loading evaluation...</div>
                }
            </div>
        </div>
    )
}

export default EvaluatePart