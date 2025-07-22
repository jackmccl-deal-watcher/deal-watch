import './EvaluatePart.css'
import { useState, useEffect } from 'react'
import { evaluatePart } from '../../utils/ApiUtils'
import ComponentPartForm from './ComponentPartForm';
import EvaluationScatterChart from './EvaluationScatterChart';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const EvaluatePart = () => {
    const [evaluationData, setEvaluationData] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [trendColor, setTrendColor] = useState('')
    const [thirtyDayTrend, setThirtyDayTrend] = useState('')
    const [marketValue, setMarketValue] = useState('')

    const getPartEvaluation = async (part) => {
        try {
            setLoading(true)
            setMessage("Loading...")
            setTrendColor('')
            const response = await evaluatePart(part)
            switch (response.status) {
                case 'success':
                    setEvaluationData(response.evaluationData)
                    setLoading(false)
                    setMessage('')
                    break
                case 'error':
                    setMessage(response.message)
                    setLoading(false)
                    break
            }
        } catch (error) {
            console.error('Error getting part evaluation:', error)
        }
    }

    useEffect( () => {
        if(evaluationData && evaluationData.M_A_Points) {
            calcMarketValue()
            calcThirtyDayTrend()
        }
    }, [evaluationData])

    const convertPriceToDollar = (price) => {
        return new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(price)
    }

    const calcMarketValue = () => {
        setMarketValue(convertPriceToDollar(evaluationData.M_A_Points.data[0].y))
    }

    const calcThirtyDayTrend = () => {
        const nowPrice = evaluationData.M_A_Points.data[0].y
        const priceThirtyDaysAgo = evaluationData.M_A_Points.data[29].y
        const thirtyDayTrendAmount = nowPrice-priceThirtyDaysAgo
        const thirtyDayTrendString = convertPriceToDollar(nowPrice-priceThirtyDaysAgo)
        if (thirtyDayTrendAmount >= 0) {
            setTrendColor('green')
            setThirtyDayTrend(`+${thirtyDayTrendString}`)
        } else {
            setTrendColor('red')
            setThirtyDayTrend(`${thirtyDayTrendString}`)
        }
    }
    
    return(
        <div className='evaluatepart'>
            <ComponentPartForm handlePartEvaluation={getPartEvaluation}/>
            <div className='loading'>{ loading ? <LoadingScreen/> : null}</div>
            <p id='message'>{message}</p>
            <div className='evaluation'>
                { !loading && evaluationData.X_Y_Points && evaluationData.M_A_Points ?
                    <div className='evaluation-results'>
                        <p className='evaluation-results-expected-value'>Expected Market Value: {marketValue}</p>
                        <p style={{color: `${trendColor}`}} className='evaluation-results-trend'>30 Day Trend: {thirtyDayTrend}</p>
                        <EvaluationScatterChart evaluationData={evaluationData}/>
                    </div>  : null
                }
            </div>
        </div>
    )
}

export default EvaluatePart