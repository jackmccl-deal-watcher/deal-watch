import { useState } from "react"
import { fetchDeals } from "../../utils/ApiUtils"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import './DealWatch.css'
import Deal from "./Deal"
import LoadingScreen from "../LoadingScreen/LoadingScreen"
import { useEffect } from "react"

const DealWatch = () => {
    const [deals, setDeals] = useState([])
    const [minBudget, setMinBudget] = useState(100)
    const [maxBudget, setMaxBudget] = useState(1000)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const updateBudget = (e, setter) => {
        const newBudget = Number(e.target.value)
        if (!isNaN(newBudget) && newBudget >= 0) {
            setter(newBudget)
        }
    }

    const fetchAndProcessDeals = async () => {
        if (minBudget > maxBudget) {
            setMessage('Minimum budget must be less than maximum budget!')
            setDeals([])
            return
        }
        setLoading(true)
        const newDeals = await fetchDeals(minBudget, maxBudget)
        if(newDeals.status === 'success') {
            setDeals(newDeals.deals)
            setMessage('')
        } else {
            setMessage('Failed to fetch deals, please refresh the page')
        }
        setLoading(false)
    }

    useEffect( () => {
        fetchAndProcessDeals()
    }, [minBudget, maxBudget])

    return(
        <div className='deal-watch'>
            <div className='deal-watch-budget'>
                <TextField 
                    label="Minimum Budget" 
                    value={minBudget} 
                    onChange={(e) => updateBudget(e, setMinBudget)}
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        },
                    }}
                />
                <TextField 
                    label="Maximum Budget" 
                    value={maxBudget} 
                    onChange={(e) => updateBudget(e, setMaxBudget)}
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        },
                    }}
                />
            </div>
            <div className='deal-watch-deals'>
                { deals && !loading ? deals.map( (deal) => <Deal key={deal.title} deal={deal}/>) : <LoadingScreen/> }
            </div>
            <div className='deal-watch-message'>{message}</div>
        </div>
    )
}

export default DealWatch