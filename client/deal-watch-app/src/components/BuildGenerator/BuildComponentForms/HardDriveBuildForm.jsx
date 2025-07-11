import SumSliders from '../SumSliders'
const HardDriveBuildForm = ({ handlePointsAllocations }) => {
    return(
        <div className='hard-drive-build-form'>
            <p>HardDrive:</p>
            <SumSliders specs={[{ key: 'capacity', tag: 'Capacity' }, { key: 'storage_type', tag: 'Storage Type' }]} handlePointsAllocations={handlePointsAllocations}/>
        </div>
    )
}

export default HardDriveBuildForm