import { useState, useEffect } from "react"
import Slider from '@mui/material/Slider';
import './SumSliders.css'

const SumSliders = ({ specs }) => {
    const [pointsDict, setPointsDict] = useState({})

    const updatePointsDict = ({spec, newValue}) => {
        setPointsDict(prevDict => ({...prevDict, [spec]: newValue}))
    }

    const createPointsDict = () => {
        let newDict = {}
        specs && specs.forEach((spec) => newDict[spec] = (1 / specs.length))
        setPointsDict(newDict)
    }

    const getSliderLabelText = (points) => {
        return Math.floor(points)
    }

    const createSliderDiv = (spec) => {
        return (
            <div key={spec} className='sum-slider-div'>
                <p className='sum-slider-title'>{spec}:</p>
                <Slider min={1} max={100} step={1} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={pointsDict[spec]} onChange={(e, newValue) => updatePointsDict(spec, newValue)}></Slider>
            </div>
        )
    }

    useEffect(() => {
        createPointsDict()
    }, [])

    const createSliders = () => {
        return (
            <div className='sum-sliders-container'>
                {specs && specs.map((spec) => {
                    return pointsDict[spec] && createSliderDiv(spec)
                })}
            </div>
        )
    }

    return(
        <div className='sum-sliders'>
            {createSliders()}
        </div>
    )
}

export default SumSliders