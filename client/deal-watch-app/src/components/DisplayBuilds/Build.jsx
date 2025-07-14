import { getCapacityLabelText } from "../EvaluatePart/ComponentForms/HardDrivePartForm";
import { ComponentSpecs, LABELS_DICT } from "./BuildConstants"
import './Build.css'

const Build = ({build}) => {
    let build_price = 0

    const displaySpecValue = (spec, value) => {
        switch (typeof value) {
            case 'string':
                return value
            case 'number':
                switch (spec) {
                    case ComponentSpecs.CORES:
                    case ComponentSpecs.RAM_SLOTS:
                    case ComponentSpecs.CAS_TIMING:
                        return `${value}`
                    case ComponentSpecs.FIRST_WORD_LATENCY:
                        return `${value} ns`
                    case ComponentSpecs.PRICE_PER_GB:
                        return `$${Math.round(value * 100) / 100}`
                    case ComponentSpecs.WATTAGE:
                        return `${value} watts`
                    case ComponentSpecs.BASE_CLOCK:
                    case ComponentSpecs.BOOST_CLOCK:
                    case ComponentSpecs.SPEED:
                        return `${Math.round(value / 1000000000 * 100) / 100} GHz`
                    case ComponentSpecs.VRAM:
                    case ComponentSpecs.MODULE_SIZE:
                    case ComponentSpecs.TOTAL_SIZE:
                    case ComponentSpecs.MAX_RAM:
                        return `${Math.round(value / 1000000000 * 100) / 100} GBs`
                    case ComponentSpecs.CAPACITY:
                        return getCapacityLabelText(value)
                    default:
                        return
                }
            default:
                return
        }
    }

    const displayBuildInfo = () => {
        return Object.entries(build).map( ([key, value]) => {
            if (key === 'title') {
                return
            }
            let part_price = 0
            if (value[ComponentSpecs.THIRTY_DAY_AVERAGE] > 0) {
                part_price = value[ComponentSpecs.THIRTY_DAY_AVERAGE]
            } else {
                part_price = value[ComponentSpecs.PCPP_PRICE]
            }

            build_price += part_price
            return(
                <div key={key} className='build-form-components'>
                    <div className='build-form-component-type'>{LABELS_DICT[key]}:</div>
                    <div className='build-form-component-specs'>
                        {
                            Object.entries(value).map( ([spec, value]) => {
                                return LABELS_DICT[spec] ? <div key={spec}>{LABELS_DICT[spec]}: {displaySpecValue(spec, value)}</div> : null
                            })
                        }
                    </div>
                    <div className='build-form-component-price'>
                        { `$${part_price}` }
                    </div>
                    <div className='build-form-component-listing'>
                        { value?.listing_info?.status === 'has_listing' ? <a href={value.listing_info.listing.itemWebUrl}>{value.listing_info.listing.title}</a> : "No listing link"}
                    </div>
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
            <div className='build-price'>
                Build Price: {`$${Math.round(build_price * 100) / 100}`}
            </div>
        </div>
    )
}

export default Build