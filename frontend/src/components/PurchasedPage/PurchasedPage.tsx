import { NavLink, useNavigate } from 'react-router-dom';
import './PurchasedPage.css';

const PurchasedPage = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div id='single-product'>
            <div id='single-product-images-text'>
                <div>
                    <div id='single-product-images-container'>
                        <div id='single-product-images-list'>
                            <h1>Item Successfully Purchased!</h1>
                        </div>
                    </div>
                </div>
                <div id='single-product-text'>
                    <div id='single-product-buttons-container'>
                        <p>Item will ship to 123 3rd st. San Francisco, California in 3-4 business days</p>
                        <button className='single-product-buttons
                                           single-product-buy-it-now' onClick={() => navigate('/')}>
                            Return to All Products
                        </button>
                    </div>

                </div>

            </div>
        </div>

    );
};

export default PurchasedPage;
