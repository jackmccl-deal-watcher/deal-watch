import { useState, useEffect } from "react"
import Slider from '@mui/material/Slider';
import './SumSliders.css'
import { SPEC_ALLOCATION_MAXIMUM, SPEC_ALLOCATION_MINIMUM } from "./BuildGeneratorConstants";
import { getSliderLabelText } from "./BuildComponentForms/BuildFormUtils";
import ToolTipText from "../ToolTip/ToolTipText";
import { TOOL_TIPCS_DICT } from "../../enums/ComponentToolTipsEnum";

const SumSliders = ({ color, specs, component_type, handleUpdatePoints }) => {
    const [pointsDict, setPointsDict] = useState({})
    const balancePoints = ({ newValue, spec_type, setPointsDict }) => {
        let newPointsDict = {}
        setPointsDict(prevDict => {
            newPointsDict = {...prevDict}
            newPointsDict[spec_type] = newValue
            let sum = 0
            Object.values(newPointsDict).forEach((points) => (sum += points))
            const excess = sum - 1
            const per_spec_adjustment = Math.abs(excess / (specs.length - 1))
            Object.keys(newPointsDict).forEach((key) => {
                if (key !== spec_type) {
                    if (excess > 0) {
                        newPointsDict[key] = newPointsDict[key] - per_spec_adjustment
                    } else if (excess < 0) {
                        newPointsDict[key] = newPointsDict[key] + per_spec_adjustment
                    }
                }
            })
            return newPointsDict
        })
        handleUpdatePoints(pointsDict)
        return newPointsDict
    }

    const updatePointsDict = ({spec, newValue}) => {
        const spec_type = spec.key
        const newPointsDict = balancePoints({ newValue, spec_type, setPointsDict })
        if (newPointsDict) {
            handleUpdatePoints(newPointsDict)
        }
    }

    const createPointsDict = () => {
        let newPointsDict = {}
        specs && specs.forEach((spec) => newPointsDict[spec.key] = (1 / specs.length))
        if (newPointsDict) {
            handleUpdatePoints(newPointsDict)
        }
        setPointsDict(newPointsDict)
    }
    
    useEffect(() => {
        createPointsDict()
    }, [])

    const createSliderDiv = (spec) => {
        return (
            <div key={spec.key} className='sum-slider-div'>
                <div className='sum-slider-title'> <ToolTipText main_text={`${spec.tag}: ${getSliderLabelText(pointsDict[spec.key])}`} tool_tip={TOOL_TIPCS_DICT[component_type][spec.key]}/></div>
                <Slider sx={{color: color}}min={SPEC_ALLOCATION_MINIMUM} max={SPEC_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText(pointsDict[spec.key])} value={pointsDict[spec.key]} onChange={(e, newValue) => updatePointsDict({ spec, newValue })}></Slider>
            </div>
        )
    }

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