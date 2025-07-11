import SumSliders from '../SumSliders'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { CPU_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants';

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
            { allocations?.[ComponentTypes.CPU]?.['allocation'] ?
                <div className='build-form'>
                    <p>CPU: {getSliderLabelText(allocations[ComponentTypes.CPU]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.CPU]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue })}></Slider>
                    <SumSliders specs={[{ key: CPU_PROPERTIES.CORES, tag: 'Cores' }, { key: CPU_PROPERTIES.BASE_CLOCK, tag: 'Base Clock' }, { key: CPU_PROPERTIES.BOOST_CLOCK, tag: 'Boost Clock' }]} handlePointsAllocations={handlePointsAllocations}/>
                </div> : null
            }
        </div>
    )
}

export default CPUBuildForm