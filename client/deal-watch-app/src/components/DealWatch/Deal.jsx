import { convertPriceToDollar } from '../../utils/Currency';
import './Deal.css'

const Deal = ({ deal }) => {
    return(
        <div className='deal'>
            <p className='deal-title'>Title: {deal.title}</p>
            <p className='deal-listing-price'>Listing Price: {convertPriceToDollar(deal.price)}</p>
            <p className='deal-description'>Description: {deal.description}</p>
            <a className='deal-listing-link' href={deal.itemWebUrl}>Listing Link</a>
            <p className='deal-listing-components-header'>Assessed Components:</p>
            { deal?.components_dict ? Object.values(deal.components_dict).map( (component_info) => {
                return (Array.isArray(component_info) ? component_info : [component_info]).map( (singular_component_info) => {
                    if (singular_component_info === null || typeof singular_component_info === 'number') {
                        return
                    }
                    return (
                        <div className='deal-component-info' key={singular_component_info.model}>
                            <p className='deal-component-info-model'>Model: {singular_component_info.model}</p>
                            <p className='deal-component-info-estimated-value'>Estimated Value: {convertPriceToDollar(singular_component_info.estimated_value)}</p>
                        </div>
                    );
                });
            }) : null }
            <p className='deal-listing-defined-value'>Defined Value: {convertPriceToDollar(deal.defined_value)}</p>
            <p className='deal-listing-assessed-value'>Assessed Value: {convertPriceToDollar(deal.assessed_value)}</p>
        </div>
    )
}

export default Deal