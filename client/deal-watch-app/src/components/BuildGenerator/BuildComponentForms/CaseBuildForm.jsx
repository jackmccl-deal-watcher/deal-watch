import SumSliders from '../SumSliders'
const CaseBuildForm = ({ handleAllocations }) => {
    return(
        <div className='case-build-form'>
            <p>Case:</p>
            <SumSliders specs={[{ key: 'internal_bays', tag: 'Internal Bays' }, { key: 'color', tag: 'Color' }]} handleAllocations={handleAllocations}/>
        </div>
    )
}

export default CaseBuildForm