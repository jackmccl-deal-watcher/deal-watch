import { useLocation } from "react-router-dom"
import Build from "./Build"

const DisplayBuilds = () => {
    const location = useLocation()
    const builds = location.state
    return(
        <div className='display-builds'>
            {Object.entries(builds).map( ([key, value]) => {
                switch (key) {
                    case 'budget_build':
                        value['title'] = "Budget Build"
                        break
                    case 'balanced_build':
                        value['title'] = "Balanced Build"
                        break
                    case 'performance_build':
                        value['title'] = "Performance Build"
                        break
                    default:
                        throw new Error(`Build type ${key} not found`)
                }
                return <Build build={value}/>
            })}
        </div>
    )
}

export default DisplayBuilds