import SumSliders from '../SumSliders'
const VideoCardBuildForm = ({ handleAllocations }) => {
    return(
        <div className='videocard-build-form'>
            <p>Video-Card:</p>
            <SumSliders specs={[{ key: 'vram', tag: 'Vram' }, { key: 'base_clock', tag: 'Base Clock' }, { key: 'boost_clock', tag: 'Boost Clock' }]} handleAllocations={handleAllocations}/>
        </div>
    )
}

export default VideoCardBuildForm