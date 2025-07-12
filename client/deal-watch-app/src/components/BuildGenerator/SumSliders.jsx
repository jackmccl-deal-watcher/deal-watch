import { useState, useEffect } from "react"
import Slider from '@mui/material/Slider';
import './SumSliders.css'
import { SPEC_ALLOCATION_MAXIMUM, SPEC_ALLOCATION_MINIMUM } from "./BuildGeneratorConstants";
import { handlePointsAllocations } from "./BuildComponentForms/BuildFormUtils";
import { getSliderLabelText } from "./BuildComponentForms/BuildFormUtils";

const SumSliders = ({ specs, handlePointsAllocationsParameters }) => {
    const [pointsDict, setPointsDict] = useState({})

    const updatePointsDict = ({spec, newValue}) => {
        setPointsDict(prevDict => {
            let newPointsDict = {...prevDict}
            newPointsDict[spec.key] = newValue
            let sum = 0
            Object.values(newPointsDict).forEach((points) => (sum += points))
            const excess = sum - 1
            const per_spec_adjustment = Math.abs(excess / (specs.length - 1))
            Object.keys(newPointsDict).forEach((key) => {
                if (key !== spec.key) {
                    if (excess > 0) {
                        newPointsDict[key] = newPointsDict[key] - per_spec_adjustment
                    } else if (excess < 0) {
                        newPointsDict[key] = newPointsDict[key] + per_spec_adjustment
                    }
                }
            })
            return newPointsDict
        })
        if (handlePointsAllocationsParameters && pointsDict) {
            handlePointsAllocationsParameters["pointsDict"] = pointsDict
            handlePointsAllocations(handlePointsAllocationsParameters)
        }
    }

    const createPointsDict = () => {
        let newPointsDict = {}
        specs && specs.forEach((spec) => newPointsDict[spec.key] = (1 / specs.length))
        if (handlePointsAllocationsParameters && newPointsDict) {
            handlePointsAllocationsParameters["pointsDict"] = newPointsDict
            handlePointsAllocations(handlePointsAllocationsParameters)
        }
        setPointsDict(newPointsDict)
    }

    const createSliderDiv = (spec) => {
        return (
            <div key={spec.key} className='sum-slider-div'>
                <p className='sum-slider-title'>{spec.tag}: {getSliderLabelText(pointsDict[spec.key])}</p>
                <Slider min={SPEC_ALLOCATION_MINIMUM} max={SPEC_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={pointsDict[spec.key]} onChange={(e, newValue) => updatePointsDict({ spec, newValue })}></Slider>
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