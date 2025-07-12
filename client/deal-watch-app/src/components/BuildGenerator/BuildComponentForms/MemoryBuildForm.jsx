import SumSliders from '../SumSliders'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { MEMORY_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants';
import { getSliderLabelText } from './BuildFormUtils'
import { updateComponentAllocation } from './BuildFormUtils';

const MemoryBuildForm = ({ handleAllocations, allocations }) => {
    return(
        <div>
            { allocations?.[ComponentTypes.MEMORY]?.['allocation'] ?
                <div className='build-form'>
                    <p>Memory: {getSliderLabelText(allocations[ComponentTypes.MEMORY]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.MEMORY]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue, component_type: ComponentTypes.MEMORY, allocations, handleAllocations })}></Slider>
                    <SumSliders specs={[{ key: MEMORY_PROPERTIES.SPEED, tag: 'Speed' }, { key: MEMORY_PROPERTIES.TOTAL_SIZE, tag: 'Total Size' }, { key: MEMORY_PROPERTIES.MODULE_TYPE, tag: 'Module Type' }]} handlePointsAllocationsParameters={{ component_type: ComponentTypes.MEMORY, special_specs: {}, allocations, handleAllocations }}/>
                </div> : null
            }
        </div>
    )
}

export default MemoryBuildForm