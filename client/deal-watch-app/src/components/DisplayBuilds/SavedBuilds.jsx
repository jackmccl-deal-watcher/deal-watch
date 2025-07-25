import { useEffect, useState } from "react"
import { fetchSavedBuilds } from "../../utils/ApiUtils"
import Build from "./Build"
import LoadingScreen from "../LoadingScreen/LoadingScreen"
import './SavedBuilds.css'
import { useUser } from "../UserProvider/UserProvider"
import { useNavigate } from "react-router-dom"

const SavedBuilds = () => {
    const [savedBuilds, setSavedBuilds] = useState([])
    const { user, setUser } = useUser()
    const navigate = useNavigate()
    
    const fetchAndSetSavedBuilds = async () => {
        const savedBuildsResponse = await fetchSavedBuilds()
        setSavedBuilds(savedBuildsResponse.saved_builds)
    }
    useEffect(() => {
        fetchAndSetSavedBuilds()
    }, [])
    return(
        <div className='saved-builds'>
            { user ?
                ( savedBuilds ? savedBuilds.map((build) => {
                    build.saved = true
                    return <Build key={build.title} build={build}/>
                }) : <LoadingScreen/> )
            : navigate('/login')}
        </div>
    )
}

export default SavedBuilds