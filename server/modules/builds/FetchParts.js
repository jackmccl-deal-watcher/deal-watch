const { MODEL_DICT } = require("./BuildConstants")

const fetchPartsInBudget = async (userAllocations, budget_margin) => {
    let partsDict = {}
    for (let [component_key, component] of Object.entries(userAllocations.components)) {
        const componentBudget = userAllocations.budget * component.allocation
        const componentBudgetLow = componentBudget - componentBudget * budget_margin
        const componentBudgetHigh = componentBudget
        
        const componentModel = MODEL_DICT[component_key]
        const partsInBudget = await componentModel.find( { 
            $or: [
                {
                    $and: [
                        { thirty_day_average: {$gte: componentBudgetLow} },
                        { thirty_day_average: {$lte: componentBudgetHigh} },
                    ]
                },
                {
                    $and: [
                        { thirty_day_average: -1},
                        { pcpp_price: {$gte: componentBudgetLow} },
                        { pcpp_price: {$lte: componentBudgetHigh} },
                    ]
                },
            ]
        })
        partsDict[component_key] = partsInBudget
    }
    console.log(partsDict)
    return partsDict
}

module.exports = { fetchPartsInBudget }