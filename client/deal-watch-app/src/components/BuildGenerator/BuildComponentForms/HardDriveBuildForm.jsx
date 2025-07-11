import SumSliders from '../SumSliders'
const HardDriveBuildForm = ({ handleAllocations }) => {
    return(
        <div className='hard-drive-build-form'>
            <p>HardDrive:</p>
            <SumSliders specs={[{ key: 'capacity', tag: 'Capacity' }, { key: 'storage_type', tag: 'Storage Type' }]} handleAllocations={handleAllocations}/>
        </div>
    )
}

export default HardDriveBuildForm