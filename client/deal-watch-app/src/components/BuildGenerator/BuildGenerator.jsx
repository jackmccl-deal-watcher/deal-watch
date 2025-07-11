import './BuildGenerator.css'
import SumSliders from './SumSliders'

const BuildGenerator = () => {
    return(
        <div className='build-gen'>
            <div className='build-gen-forms'>
                <div className='build-gen-forms-cpu'>
                    <p>CPU:</p>
                    <SumSliders specs={['Cores', 'Base Clock', 'Boost Clock']}/>
                </div>
            </div>
        </div>
    )
}

export default BuildGenerator