import { useEffect } from 'react';
import SumSliders from '../SumSliders'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import { CPU_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import Slider from '@mui/material/Slider';

const CPUBuildForm = ({ handleAllocations, allocations }) => {

    const handlePointsAllocations = (pointsDict) => {
        let componentAllocationsDict = {...pointsDict}
        pointsDict && Object.keys(pointsDict).forEach((key) => {
            componentAllocationsDict[key] = pointsDict[key]
        })
        componentAllocationsDict['allocation'] = allocations[ComponentTypes.CPU]['allocation']
        handleAllocations(ComponentTypes.CPU, componentAllocationsDict)
    }

    const updateComponentAllocation = ({newValue}) => {
        let componentAllocationsDict = {...allocations[ComponentTypes.CPU]}
        componentAllocationsDict['allocation'] = newValue
        handleAllocations(ComponentTypes.CPU, componentAllocationsDict)
    }

    const getSliderLabelText = (points) => {
        return Math.floor(points * 100)
    }

    return(
        <div>
            { allocations?.[ComponentTypes.CPU] ?
                <div className='build-form'>
                    <p>CPU:</p>
                    <Slider min={0.01} max={1} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.CPU]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue })}></Slider>
                    <SumSliders specs={[{ key: 'cores', tag: 'Cores' }, { key: 'base_clock', tag: 'Base Clock' }, { key: 'boost_clock', tag: 'Boost Clock' }]} handlePointsAllocations={handlePointsAllocations}/>
                </div> : null
            }
        </div>
    )
}

export default CPUBuildForm