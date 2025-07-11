import SumSliders from '../SumSliders'
const PowerSupplyBuildForm = ({ handleAllocations }) => {
    return(
        <div className='power-supply-build-form'>
            <p>PowerSupply:</p>
            <SumSliders specs={[{ key: 'wattage', tag: 'Wattage' }, { key: 'efficiency_rating', tag: 'Efficiency Rating' }, { key: 'modular', tag: 'Modularity' }]} handleAllocations={handleAllocations}/>
        </div>
    )
}

export default PowerSupplyBuildForm