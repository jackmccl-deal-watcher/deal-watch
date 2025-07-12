import SumSliders from '../SumSliders'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { VIDEOCARD_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants';
import { getSliderLabelText } from './BuildFormUtils'
import { updateComponentAllocation } from './BuildFormUtils';
import ComponentBuildForm from './ComponentBuildForm';

const VideoCardBuildForm = (component_form_prop) => {
    return(
        <div>
            <ComponentBuildForm {...component_form_prop}/>
        </div>
    )
}

export default VideoCardBuildForm