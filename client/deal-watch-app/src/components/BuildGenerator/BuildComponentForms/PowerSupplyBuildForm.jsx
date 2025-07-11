import SumSliders from '../SumSliders'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { POWER_SUPPLY_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants';

const PowerSupplyBuildForm = ({ handleAllocations, allocations }) => {

    const handlePointsAllocations = (pointsDict) => {
        let componentAllocationsDict = {...pointsDict}
        pointsDict && Object.keys(pointsDict).forEach((key) => {
            componentAllocationsDict[key] = pointsDict[key]
        })
        componentAllocationsDict['allocation'] = allocations[ComponentTypes.POWER_SUPPLY]['allocation']
        handleAllocations(ComponentTypes.POWER_SUPPLY, componentAllocationsDict)
    }

    const updateComponentAllocation = ({newValue}) => {
        let componentAllocationsDict = {...allocations[ComponentTypes.POWER_SUPPLY]}
        componentAllocationsDict['allocation'] = newValue
        handleAllocations(ComponentTypes.POWER_SUPPLY, componentAllocationsDict)
    }

    const getSliderLabelText = (points) => {
        return Math.floor(points * 100)
    }

    return(
        <div>
            { allocations?.[ComponentTypes.POWER_SUPPLY]?.['allocation'] ?
                <div className='build-form'>
                    <p>Power-Supply: {getSliderLabelText(allocations[ComponentTypes.POWER_SUPPLY]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.POWER_SUPPLY]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue })}></Slider>
                    <SumSliders specs={[{ key: POWER_SUPPLY_PROPERTIES.WATTAGE, tag: 'Wattage' }, { key: POWER_SUPPLY_PROPERTIES.EFFICIENCY_RATING, tag: 'Efficiency Rating' }, { key: POWER_SUPPLY_PROPERTIES.MODULAR, tag: 'Modularity' }]} handlePointsAllocations={handlePointsAllocations}/>
                </div> : null
            }
        </div>
    )
}

export default PowerSupplyBuildForm