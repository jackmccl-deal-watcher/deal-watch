import SumSliders from '../SumSliders'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { CPU_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants';
import { getSliderLabelText } from './BuildFormUtils'
import { updateComponentAllocation } from './BuildFormUtils';

const CPUBuildForm = ({ handleAllocations, allocations }) => {
    return(
        <div>
            { allocations?.[ComponentTypes.CPU]?.['allocation'] ?
                <div className='build-form'>
                    <p>CPU: {getSliderLabelText(allocations[ComponentTypes.CPU]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.CPU]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue, component_type: ComponentTypes.CPU, allocations, handleAllocations })}></Slider>
                    <SumSliders specs={[{ key: CPU_PROPERTIES.CORES, tag: 'Cores' }, { key: CPU_PROPERTIES.BASE_CLOCK, tag: 'Base Clock' }, { key: CPU_PROPERTIES.BOOST_CLOCK, tag: 'Boost Clock' }]} handlePointsAllocationsParameters={{ component_type: ComponentTypes.CPU, special_specs: {}, allocations, handleAllocations }}/>
                </div> : null
            }
        </div>
    )
}

export default CPUBuildForm