import SumSliders from '../SumSliders'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { VIDEOCARD_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants';

const VideoCardBuildForm = ({ handleAllocations, allocations }) => {

    const handlePointsAllocations = (pointsDict) => {
        let componentAllocationsDict = {...pointsDict}
        pointsDict && Object.keys(pointsDict).forEach((key) => {
            componentAllocationsDict[key] = pointsDict[key]
        })
        componentAllocationsDict['allocation'] = allocations[ComponentTypes.VIDEOCARD]['allocation']
        handleAllocations(ComponentTypes.VIDEOCARD, componentAllocationsDict)
    }

    const updateComponentAllocation = ({newValue}) => {
        let componentAllocationsDict = {...allocations[ComponentTypes.VIDEOCARD]}
        componentAllocationsDict['allocation'] = newValue
        handleAllocations(ComponentTypes.VIDEOCARD, componentAllocationsDict)
    }

    const getSliderLabelText = (points) => {
        return Math.floor(points * 100)
    }
    
    return(
        <div>
            { allocations?.[ComponentTypes.VIDEOCARD]?.['allocation'] ?
                <div className='build-form'>
                    <p>Video-Card: {getSliderLabelText(allocations[ComponentTypes.VIDEOCARD]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.VIDEOCARD]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue })}></Slider>
                    <SumSliders specs={[{ key: VIDEOCARD_PROPERTIES.VRAM, tag: 'Vram' }, { key: VIDEOCARD_PROPERTIES.BASE_CLOCK, tag: 'Base Clock' }, { key: VIDEOCARD_PROPERTIES.BOOST_CLOCK, tag: 'Boost Clock' }]} handlePointsAllocations={handlePointsAllocations}/>
                </div> : null
            }
        </div>
    )
}

export default VideoCardBuildForm