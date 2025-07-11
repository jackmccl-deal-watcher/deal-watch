import SumSliders from '../SumSliders'
const CPUBuildForm = ({ handleAllocations }) => {
    return(
        <div className='cpu-build-form'>
            <p>CPU:</p>
            <SumSliders specs={[{ key: 'cores', tag: 'Cores' }, { key: 'base_clock', tag: 'Base Clock' }, { key: 'boost_clock', tag: 'Boost Clock' }]} handleAllocations={handleAllocations}/>
        </div>
    )
}

export default CPUBuildForm