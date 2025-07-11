import SumSliders from '../SumSliders'
const MotherboardBuildForm = ({ handleAllocations }) => {
    return(
        <div className='motherboard-build-form'>
            <p>Motherboard:</p>
            <SumSliders specs={[{ key: 'ram_slots', tag: 'Ram Slots' }, { key: 'max_ram', tag: 'Max Ram' }]} handleAllocations={handleAllocations}/>
        </div>
    )
}

export default MotherboardBuildForm