import SumSliders from '../SumSliders'
const PowerSupplyBuildForm = ({ handlePointsAllocations }) => {
    return(
        <div className='power-supply-build-form'>
            <p>PowerSupply:</p>
            <SumSliders specs={[{ key: 'wattage', tag: 'Wattage' }, { key: 'efficiency_rating', tag: 'Efficiency Rating' }, { key: 'modular', tag: 'Modularity' }]} handlePointsAllocations={handlePointsAllocations}/>
        </div>
    )
}

export default PowerSupplyBuildForm