import SumSliders from '../SumSliders'
const VideoCardBuildForm = ({ handlePointsAllocations }) => {
    return(
        <div className='videocard-build-form'>
            <p>Video-Card:</p>
            <SumSliders specs={[{ key: 'vram', tag: 'Vram' }, { key: 'base_clock', tag: 'Base Clock' }, { key: 'boost_clock', tag: 'Boost Clock' }]} handlePointsAllocations={handlePointsAllocations}/>
        </div>
    )
}

export default VideoCardBuildForm