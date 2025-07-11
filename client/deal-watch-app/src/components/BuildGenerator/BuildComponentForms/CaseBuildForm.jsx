import { useState } from 'react'
import SumSliders from '../SumSliders'
import OptionsDropdown from '../../EvaluatePart/ComponentForms/OptionsDropdown'
const CaseBuildForm = ({ handlePointsAllocations }) => {
    const [color, setColor] = useState('')
    const COLORS = [
        'Black',
        'Black / Black',
        'Black / Blue',
        'Black / Gold',
        'Black / Gray',
        'Black / Green',
        'Black / Multicolor',
        'Black / Orange',
        'Black / Pink',
        'Black / Red',
        'Black / Silver',
        'Black / White',
        'Black / Yellow',
        'Beige / Gray',
        'Blue',
        'Blue / Black',
        'Blue / Silver',
        'Blue / Yellow',
        'Brown',
        'Camo',
        'Clear',
        'Gold',
        'Gray',
        'Gray / Black',
        'Gray / Silver',
        'Green',
        'Green / Black',
        'Green / Silver',
        'Gunmetal',
        'Multicolor',
        'Orange',
        'Pink',
        'Red',
        'Red / Black',
        'Red / Blue',
        'Red / White',
        'Silver',
        'Silver / Black',
        'Silver / Gray',
        'Silver / Orange',
        'White',
        'White / Black',
        'White / Blue',
        'White / Purple',
        'White / Red',
        'White / Silver',
        'Yellow'
    ]
    return(
        <div className='case-build-form'>
            <p>Case:</p>
            <SumSliders specs={[{ key: 'internal_bays', tag: 'Internal Bays' }, { key: 'color', tag: 'Color' }]} handlePointsAllocations={handlePointsAllocations}/>
            <OptionsDropdown options={COLORS} optionsType={'Color'} currentOption={color} setCurrentOption={setColor}/>
        </div>
    )
}

export default CaseBuildForm