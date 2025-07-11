import SumSliders from '../SumSliders'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { MEMORY_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants';

const MemoryBuildForm = ({ handleAllocations, allocations }) => {

    const handlePointsAllocations = (pointsDict) => {
        let componentAllocationsDict = {...pointsDict}
        pointsDict && Object.keys(pointsDict).forEach((key) => {
            componentAllocationsDict[key] = pointsDict[key]
        })
        componentAllocationsDict['allocation'] = allocations[ComponentTypes.MEMORY]['allocation']
        handleAllocations(ComponentTypes.MEMORY, componentAllocationsDict)
    }

    const updateComponentAllocation = ({newValue}) => {
        let componentAllocationsDict = {...allocations[ComponentTypes.MEMORY]}
        componentAllocationsDict['allocation'] = newValue
        handleAllocations(ComponentTypes.MEMORY, componentAllocationsDict)
    }

    const getSliderLabelText = (points) => {
        return Math.floor(points * 100)
    }


    return(
        <div>
            { allocations?.[ComponentTypes.MEMORY]?.['allocation'] ?
                <div className='build-form'>
                    <p>Memory: {getSliderLabelText(allocations[ComponentTypes.MEMORY]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.MEMORY]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue })}></Slider>
                    <SumSliders specs={[{ key: MEMORY_PROPERTIES.SPEED, tag: 'Speed' }, { key: MEMORY_PROPERTIES.TOTAL_SIZE, tag: 'Total Size' }, { key: MEMORY_PROPERTIES.MODULE_TYPE, tag: 'Module Type' }]} handlePointsAllocations={handlePointsAllocations}/>
                </div> : null
            }
        </div>
    )
}

export default MemoryBuildForm