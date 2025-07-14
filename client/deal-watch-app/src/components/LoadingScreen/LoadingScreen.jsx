import CircularProgress from '@mui/material/CircularProgress';

const LoadingScreen = ({message}) => {
    return(
        <div className='loading-screen'>
            <CircularProgress />
        </div>
    )
}

export default LoadingScreen