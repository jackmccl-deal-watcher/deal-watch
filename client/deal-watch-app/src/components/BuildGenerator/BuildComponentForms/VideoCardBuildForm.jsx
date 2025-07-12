import SumSliders from '../SumSliders'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { VIDEOCARD_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants';
import { getSliderLabelText } from './BuildFormUtils'
import { updateComponentAllocation } from './BuildFormUtils';

const VideoCardBuildForm = ({ handleAllocations, allocations }) => {
    return(
        <div>
            { allocations?.[ComponentTypes.VIDEOCARD]?.['allocation'] ?
                <div className='build-form'>
                    <p>Video-Card: {getSliderLabelText(allocations[ComponentTypes.VIDEOCARD]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.VIDEOCARD]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue, component_type: ComponentTypes.VIDEOCARD, allocations, handleAllocations })}></Slider>
                    <SumSliders specs={[{ key: VIDEOCARD_PROPERTIES.VRAM, tag: 'Vram' }, { key: VIDEOCARD_PROPERTIES.BASE_CLOCK, tag: 'Base Clock' }, { key: VIDEOCARD_PROPERTIES.BOOST_CLOCK, tag: 'Boost Clock' }]} handlePointsAllocationsParameters={{ component_type: ComponentTypes.VIDEOCARD, special_specs: {}, allocations, handleAllocations }}/>
                </div> : null
            }
        </div>
    )
}

export default VideoCardBuildForm