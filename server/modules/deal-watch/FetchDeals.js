const DealModel = require("../../models/DealModel")
const { MIN_NUM_DEFINED_COMPONENT_MODELS } = require("./DealWatchConstants")

const fetchDeals = async (min_budget, max_budget) => {
    const dealsInBudget = await DealModel.find( { 
        $and: [
            { price: {$gte: min_budget} },
            { price: {$lte: max_budget} },
            { [components_dict.num_defined]: {$gte: MIN_NUM_DEFINED_COMPONENT_MODELS}}
        ]
    })
    return dealsInBudget
}

module.exports = fetchDeals