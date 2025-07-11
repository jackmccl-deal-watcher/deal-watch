import SumSliders from '../SumSliders'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { HARD_DRIVE_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants';

const HardDriveBuildForm = ({ handleAllocations, allocations }) => {

    const handlePointsAllocations = (pointsDict) => {
        let componentAllocationsDict = {...pointsDict}
        pointsDict && Object.keys(pointsDict).forEach((key) => {
            componentAllocationsDict[key] = pointsDict[key]
        })
        componentAllocationsDict['allocation'] = allocations[ComponentTypes.HARD_DRIVE]['allocation']
        handleAllocations(ComponentTypes.HARD_DRIVE, componentAllocationsDict)
    }

    const updateComponentAllocation = ({newValue}) => {
        let componentAllocationsDict = {...allocations[ComponentTypes.HARD_DRIVE]}
        componentAllocationsDict['allocation'] = newValue
        handleAllocations(ComponentTypes.HARD_DRIVE, componentAllocationsDict)
    }

    const getSliderLabelText = (points) => {
        return Math.floor(points * 100)
    }

    return(
        <div>
            { allocations?.[ComponentTypes.HARD_DRIVE]?.['allocation'] ?
                <div className='build-form'>
                    <p>Hard-Drive: {getSliderLabelText(allocations[ComponentTypes.HARD_DRIVE]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.HARD_DRIVE]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue })}></Slider>
                    <SumSliders specs={[{ key: HARD_DRIVE_PROPERTIES.CAPACITY, tag: 'Capacity' }, { key: HARD_DRIVE_PROPERTIES.STORAGE_TYPE, tag: 'Storage Type' }]} handlePointsAllocations={handlePointsAllocations}/>
                </div> : null
            }
        </div>
    )
}

export default HardDriveBuildForm