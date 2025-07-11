import SumSliders from '../SumSliders'
const MemoryBuildForm = ({ handleAllocations }) => {
    return(
        <div className='memory-build-form'>
            <p>Memory:</p>
            <SumSliders specs={[{ key: 'speed', tag: 'Speed' }, { key: 'total_size', tag: 'Total Size' }, { key: 'module_type', tag: 'Module Type' }]} handleAllocations={handleAllocations}/>
        </div>
    )
}

export default MemoryBuildForm