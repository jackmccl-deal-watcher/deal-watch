import { CASE_PROPERTIES, MOTHERBOARD_PROPERTIES, POWER_SUPPLY_PROPERTIES } from "../../../component_enums/ComponentPropertiesEnums"

export const handlePointsAllocations = ({ pointsDict, component_type, special_specs, allocations, handleAllocations}) => {
    let componentAllocationsDict = {...pointsDict}
    switch (component_type) {
        case 'case':
            componentAllocationsDict[CASE_PROPERTIES.FORM_FACTOR] = special_specs.form_factor
            componentAllocationsDict[CASE_PROPERTIES.COLOR] = {
                allocation: allocations[component_type]['allocation'],
                colors: special_specs.color,
            }
            break
        case 'motherboard':
            componentAllocationsDict[MOTHERBOARD_PROPERTIES.FORM_FACTOR] = special_specs.form_factor
            break
        case 'power-supply':
            componentAllocationsDict[POWER_SUPPLY_PROPERTIES.FORM_FACTOR] = special_specs.form_factor
            break
        }
    componentAllocationsDict['allocation'] = allocations[component_type]['allocation']
    handleAllocations(component_type, componentAllocationsDict)
}

export const updateComponentAllocation = ({newValue, component_type, allocations, handleAllocations}) => {
    let componentAllocationsDict = {...allocations[component_type]}
    componentAllocationsDict['allocation'] = newValue
    handleAllocations(component_type, componentAllocationsDict)
}

export const handleSpecialAllocation = ({newAllocation, spec_type, component_type, allocations, handleAllocations}) => {
    let componentAllocationsDict = {...allocations[component_type]}
    componentAllocationsDict[spec_type] = newAllocation
    handleAllocations(component_type, componentAllocationsDict)
}

export const getSliderLabelText = (points) => {
    return Math.floor(points * 100)
}