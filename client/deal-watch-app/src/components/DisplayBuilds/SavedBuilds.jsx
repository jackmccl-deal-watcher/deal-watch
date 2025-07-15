import { useEffect, useState } from "react"
import { fetchSavedBuilds } from "../../utils/ApiUtils"
import Build from "./Build"
import LoadingScreen from "../LoadingScreen/LoadingScreen"
import './SavedBuilds.css'

const SavedBuilds = () => {
    const [savedBuilds, setSavedBuilds] = useState([])
    
    const fetchAndSetSavedBuilds = async () => {
        const savedBuildsResponse = await fetchSavedBuilds()
        setSavedBuilds(savedBuildsResponse.saved_builds)
    }
    useEffect(() => {
        fetchAndSetSavedBuilds()
    }, [])
    return(
        <div className='saved-builds'>
            { savedBuilds ? savedBuilds.map((build) => {
                build.saved = true
                return <Build key={build.title} build={build}/>
            }) : <LoadingScreen/> }
        </div>
    )
}

export default SavedBuilds