import CircularProgress from '@mui/material/CircularProgress';
import './LoadingScreen.css'

const LoadingScreen = ({message}) => {
    return(
        <div className='loading-screen'>
            <CircularProgress />
        </div>
    )
}

export default LoadingScreen