import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GetSingleTransaction.css';
import { useParams } from 'react-router-dom';
import { getSingleProductThunk } from '../../redux/products';
import { RootState } from '../../redux/store';

import { getAllReviewsThunk } from '../../redux/reviews';

const GetSingleTransaction = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();
    const [isClicked, setIsClicked] = useState(false);
    const [textInsideButton, setTextInsideButton] = useState("Confirm Address");
    const product = useSelector((state: RootState) => state.products.byId[Number(id)]);
    // const currentUser = useSelector((state: RootState) => state.session.user);

    useEffect(() => {
        const singleProduct = async () => {
            await dispatch(getSingleProductThunk(Number(id)));
            await dispatch(getAllReviewsThunk(Number(id)))
            setIsLoaded(true);
        };

        if (!isLoaded) {
            singleProduct();
        }
    }, [isLoaded, dispatch, id]);

    const makeButtonGreen = () => {
        setIsClicked(true);
        if (textInsideButton === 'Confirm Address') {
            setTextInsideButton('Address Confirmed ✓');
        } else {
            setTextInsideButton('Confirm Address');
        }
    };

    if (!isLoaded || !product) {
        return <h1>Loading...</h1>;
    }

    return (
        <div id='single-product'>
            <div id='single-product-images-text'>
                <div>
                    <div id='single-product-images-container'>
                        <div id='single-product-images-list'>
                            <img src={product.product_images[0]?.url} />
                        </div>
                    </div>
                </div>
                <div id='single-product-text'>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0' }}>${product.price}</h2>
                    <p>{product.name}</p>
                    <div id='single-product-buttons-container'>
                        <button
                            className='single-product-buttons single-product-buy-it-now'
                            onClick={makeButtonGreen}
                            style={{ backgroundColor: isClicked ? 'green' : 'initial', color: 'white' }}>
                            {textInsideButton}
                        </button>
                        <p>123 3rd st. San Francisco, California</p>
                        <button className='single-product-buttons
                                           single-product-buy-it-now' onClick={() => navigate('/purchased')}>
                            Purchase item!
                        </button>
                    </div>
                    <h3>Item details</h3>
                    <p>{product.description}</p>
                </div>

            </div>
        </div>

    );
};

export default GetSingleTransaction;
