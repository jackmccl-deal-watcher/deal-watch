import { useState, useEffect } from "react"
import Slider from '@mui/material/Slider';
import './SumSliders.css'

const SumSliders = ({ specs, handleAllocations }) => {
    const [pointsDict, setPointsDict] = useState({})

    const updatePointsDict = ({spec, newValue}) => {
        setPointsDict(prevDict => {
            let newDict = {...prevDict}
            newDict[spec.key] = newValue
            let sum = 0
            Object.values(newDict).forEach((points) => (sum += points))
            const excess = sum - 1
            if (excess > 0) {
                const per_spec_adjustment = excess / (specs.length - 1)
                Object.keys(newDict).forEach((key) => {
                    if (key !== spec.key) {
                        newDict[key] = newDict[key] - per_spec_adjustment
                    }
                })
            }
            return newDict
        })
        pointsDict && handleAllocations(pointsDict)
    }

    const createPointsDict = () => {
        let newDict = {}
        specs && specs.forEach((spec) => newDict[spec.key] = (1 / specs.length))
        setPointsDict(newDict)
    }

    const getSliderLabelText = (points) => {
        return Math.floor(points * 100)
    }

    const createSliderDiv = (spec) => {
        return (
            <div key={spec.key} className='sum-slider-div'>
                <p className='sum-slider-title'>{spec.tag}:</p>
                <Slider min={0.01} max={1} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={pointsDict[spec.key]} onChange={(e, newValue) => updatePointsDict({ spec, newValue })}></Slider>
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
                    return pointsDict[spec.key] && createSliderDiv(spec)
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