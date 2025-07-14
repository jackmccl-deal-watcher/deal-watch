import { getCapacityLabelText } from "../EvaluatePart/ComponentForms/HardDrivePartForm";
import { ComponentSpecs, LABELS_DICT } from "./BuildConstants"

const Build = (build) => {
    let total_cost = 0

    const displaySpecValue = (spec, value) => {
        switch (typeof value) {
            case 'string':
                return value
            case 'number':
                case 'thirtyDayAverage':
                case 'pcppPrice':
                    if (value > 0) {
                        total_cost += value
                        return `$${value}`
                    }
                switch (spec) {
                    case ComponentSpecs.BASE_CLOCK:
                    case ComponentSpecs.BOOST_CLOCK:
                    case ComponentSpecs.SPEED:
                        return `${value / 1000000000} GHz`
                    case ComponentSpecs.VRAM:
                    case ComponentSpecs.MODULE_SIZE:
                    case ComponentSpecs.TOTAL_SIZE:
                    case ComponentSpecs.MAX_RAM:
                    case ComponentSpecs.CAPACITY:
                        return getCapacityLabelText(value)
                }
        }
    }

    const displayBuildInfo = () => {
        Object.entries(build).map( ([key, value]) => {
            return(
                <div className='build-form-component'>
                    {LABELS_DICT[key]}:
                    {
                        Object.entries(value).map( ([spec, value]) => {
                            return LABELS_DICT[spec] ? <div>{displaySpecValue(spec, value)}</div> : null
                        })
                    }
                </div>
            )
        })
    }
    return(
        <div className='build'>
            <div className='build-title'>
                {build.title}
            </div>
            <div className='build-parts'>
                {displayBuildInfo()}
            </div>
            <button className='build-delete-button'>Delete</button>
        </div>
    )
}

export default Build