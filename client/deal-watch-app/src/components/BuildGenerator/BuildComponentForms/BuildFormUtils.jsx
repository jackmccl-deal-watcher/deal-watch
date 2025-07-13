import { CASE_PROPERTIES, MOTHERBOARD_PROPERTIES, POWER_SUPPLY_PROPERTIES } from "../../../component_enums/ComponentPropertiesEnums"

export const handleAllocations = (component_type, component_allocations, setAllocations) => {
    setAllocations(prevAllocations => {
        let newAllocationsDict = {...prevAllocations}
        if (newAllocationsDict?.[component_type]?.['allocation'] && component_allocations?.['allocation'] && (newAllocationsDict[component_type]['allocation'] !== component_allocations['allocation'])) {
            let sum = 0
            Object.values(newAllocationsDict).forEach((component) => {
                if (component?.['allocation']) {
                    sum += component['allocation']
                }
            })
            const excess = sum - 1
            const per_spec_adjustment = Math.abs(excess / (COMPONENT_TYPES_STARTING_ALLOCATIONS.length - 1))
            Object.keys(newAllocationsDict).forEach((key) => {
                if (key !== component_type) {
                    if (excess > 0) {
                        newAllocationsDict[key]['allocation'] = newAllocationsDict[key]['allocation'] - per_spec_adjustment
                    } else if (excess < 0) {
                        newAllocationsDict[key]['allocation'] = newAllocationsDict[key]['allocation'] + per_spec_adjustment
                    }
                }
            })
        }
        newAllocationsDict[component_type] = component_allocations
        return newAllocationsDict
    })
}

export const balancePoints = ({ newValue, spec_type, setPointsDict }) => {
    let newPointsDict = {}
    setPointsDict(prevDict => {
        newPointsDict = {...prevDict}
        newPointsDict[spec_type] = newValue
        let sum = 0
        Object.values(newPointsDict).forEach((points) => (sum += points))
        const excess = sum - 1
        const per_spec_adjustment = Math.abs(excess / (specs.length - 1))
        Object.keys(newPointsDict).forEach((key) => {
            if (key !== spec_type) {
                if (excess > 0) {
                    newPointsDict[key] = newPointsDict[key] - per_spec_adjustment
                } else if (excess < 0) {
                    newPointsDict[key] = newPointsDict[key] + per_spec_adjustment
                }
            }
        })
        return newPointsDict
    })
    return newPointsDict
}

export const getSliderLabelText = (points) => {
    return Math.floor(points * 100)
}