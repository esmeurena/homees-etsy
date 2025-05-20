import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GetSingleProduct.css';
import { useParams } from 'react-router-dom';
import { getSingleProductThunk } from '../../redux/products';
import { RootState } from '../../redux/store';



const GetSingleProduct = (): JSX.Element => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();

    const product = useSelector((state: RootState) => state.products.byId[Number(id)]);

    useEffect(() => {
        const singleProduct = async () => {
            await dispatch(getSingleProductThunk(Number(id)));
            setIsLoaded(true);
        };

        if (!isLoaded) {
            singleProduct();
        }
    }, [isLoaded, dispatch, id]);

    if (!isLoaded) {
        return <h1>Loading...</h1>;
    }

    return (
        <div id='single-product'>
            <div id='single-product-image-text'>
                <div>
                    <img id='single-product-image'
                         src={product.product_images[0].url} />
                </div>
                <div id='single-product-text'>
                    <h2 style={{fontSize: '2rem', marginBottom: '0'}}>${product.price}</h2>
                    <p>{product.name}</p>
                    <div id='single-product-buttons-container'>
                        <button className='single-product-buttons
                                           single-product-buy-it-now'>
                        Buy it now
                        </button>
                        <button className='single-product-buttons
                                           single-product-add-to-cart'>
                        Add to cart
                        </button>
                    </div>
                    {/* <p>{product.description}</p> */}
                    {/* <p>&#9733;{product.avg_rating}</p> */}
                </div>

            </div>
            <NavLink to={`/products/${Number(id)}/update`}>
                Update a Product
            </NavLink>
        </div>

    );
};

export default GetSingleProduct;
