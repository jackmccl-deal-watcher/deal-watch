import { getCapacityLabelText } from "../EvaluatePart/ComponentForms/HardDrivePartForm";
import { ComponentSpecs, LABELS_DICT } from "./BuildConstants"
import './Build.css'
import { useUser } from "../UserProvider/UserProvider";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { saveBuild, unSaveBuild } from "../../utils/ApiUtils";
import { VARIABLE_TYPES } from "../../enums/VariableTypeEnums";
import { STATUS_CODES } from "../../enums/StatusEnums";

const Build = ({build}) => {
    const { user, setUser } = useUser()
    const [title, setTitle] = useState(build.title)
    let initially_saved = false
    if(build?.saved) {
        initially_saved = true
    }
    const [saved, setSaved] = useState(initially_saved)
    const [message, setMessage] = useState('')
    let build_price = 0

    const displaySpecValue = (spec, value) => {
        switch (typeof value) {
            case VARIABLE_TYPES.STRING:
                return value
            case VARIABLE_TYPES.NUMBER:
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
                        return `${Math.round(value / 1000000000 * 100) / 100} GHz`
                    case ComponentSpecs.SPEED:
                        return `${Math.round(value / 1000000 * 100) / 100} MHz`
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
            if (typeof value !== VARIABLE_TYPES.OBJECT) {
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

    const handleToggleSaveBuild = async () => {
        try {
            let response = null
            build.title = title
            if (!saved) {
                response = await saveBuild(build)
            } else {
                response = await unSaveBuild(build)
            }
            if (response.status === STATUS_CODES.SUCCESS) {
                setSaved(prev => !prev)
            }
            setMessage(response.message)
        } catch(error) {
            console.error(error)
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const createSaveBuildControls = () => {
        if (!saved) {
            return(
                <div className='save-builds-control'>
                        <TextField id="standard-basic" label="Build Title" variant="standard" value={title} onChange={handleTitleChange} />
                        <button onClick={handleToggleSaveBuild} className='save-builds-button'>Save Build</button>
                        <div className='save-builds-control-message'>{message}</div>
                </div>
            )
        } else {
            return(
                <div className='save-builds-control'>
                        <TextField id="standard-basic" label="Build Title" variant="standard" value={title} disabled />
                        <button onClick={handleToggleSaveBuild} className='save-builds-button'>Un-save Build</button>
                        <div className='save-builds-control-message'>{message}</div>
                </div>
            )
        }
    }
    return(
        <div className='build'>
            <div className='build-title'>
                {title}
            </div>
            <div className='build-parts'>
                {displayBuildInfo()}
            </div>
            <div className='build-price'>
                Build Price: {`$${Math.round(build_price * 100) / 100}`}
            </div>
            <div className='save-builds'>
                { user ? 
                    createSaveBuildControls()
                : 'Login to save builds!'}
            </div>
        </div>
    )
}

export default Build