import { useLocation } from "react-router-dom"
import Build from "./Build"
import './DisplayBuilds.css'
import { BUILD_SPECS } from "../../enums/BuildSpecsEnum"
import { BUILD_MODES, BUILD_TYPES } from "../../enums/BuildsModesEnum"

const DisplayBuilds = () => {
    const location = useLocation()
    const builds = location.state
    return(
        <div className='display-builds'>
            {Object.entries(builds).map( ([key, value]) => {
                switch (key) {
                    case BUILD_TYPES.BUDGET_BUILD:
                        value[BUILD_SPECS.TITLE] = BUILD_MODES.BUDGET
                        break
                    case BUILD_TYPES.BALANCED_BUILD:
                        value[BUILD_SPECS.TITLE] = BUILD_MODES.BALANCED
                        break
                    case BUILD_TYPES.PERFORMANCE_BUILD:
                        value[BUILD_SPECS.TITLE] = BUILD_MODES.PERFORMANCE
                        break
                    default:
                        throw new Error(`Build type ${key} not found`)
                }
                return <Build key={key} build={value}/>
            })}
        </div>
    )
}

export default DisplayBuilds