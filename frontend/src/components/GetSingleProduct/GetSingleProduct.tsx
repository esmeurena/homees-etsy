import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GetSingleProduct.css';
import { useParams } from 'react-router-dom';
import { getSingleProductThunk } from '../../redux/products';
import { RootState } from '../../redux/store';
import { addItemToShoppingCartThunk } from '../../redux/shopping_cart';
import DeleteProductModal from '../DeleteProductModal';
import OpenModalButton from '../OpenModalButton';
import AllReviews from '../AllReviews';
import { IProduct } from '../../redux/types/products';


const GetSingleProduct = (): JSX.Element => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();


    const product = useSelector((state: RootState) => state.products.byId[Number(id)]);
    const currentUser = useSelector((state: RootState) => state.session.user);
    // const product: IProduct = useSelector((state: RootState) => state.products.byId[Number(id)]);

    useEffect(() => {
        const singleProduct = async () => {
            await dispatch(getSingleProductThunk(Number(id)));
            setIsLoaded(true);
        };

        if (!isLoaded) {
            singleProduct();
        }
    }, [isLoaded, dispatch, id]);

    if (!isLoaded || !product) {
        return <h1>Loading...</h1>;
    }
    
const addItemToCart = async () => {

    await dispatch(addItemToShoppingCartThunk(product.id));
};

    return (
        <div id='single-product'>
            <div id='single-product-images-text'>
                <div>
                    <div id='single-product-images-container'>
                        <div id='single-product-images-list'>
                            {product.product_images.map((image, i) => {
                                return (
                                    <img className='single-product-images-list-image' src={image.url}/>
                                )
                            })}
                        </div>
                    <img id='single-product-image'
                         src={product.product_images[0].url} />
                    </div>
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
                    <h3>Item details</h3>
                    <p>{product.description}</p>
                </div>

            </div>
            <NavLink to={`/products/${Number(id)}/update`}
                     id='single-product-update'>
                Update Product
            </NavLink>
            <div style={{display: 'flex'}}>
                <h2 style={{marginRight:'.4rem'}}>{product.reviews.length} Reviews -</h2>
                <div style={{width: '8.4rem', marginTop: '.5rem'}}>
                    <div style={{width: `${product.avg_rating * 20}%`,
                    backgroundColor: 'white', overflow:'hidden'}}>
                        <span style={{width: '8.4rem', fontSize: '2rem'}}>
                            &#9733;&#9733;&#9733;&#9733;&#9733;
                        </span>
                    </div>
                </div>
            </div>

            {currentUser?.id === product.user_id && (
                <>
            <NavLink to={`/products/${Number(id)}/update`}>
                Update a Product
            </NavLink>

            <button
                onClick={addItemToCart}>
                Add to Cart
            </button>

                <OpenModalButton
                    buttonText="Delete"
                    buttonClassName="delete-btn"
                modalComponent={<DeleteProductModal productId={Number(id)}/>}

                />
             </>
            )}
            <AllReviews reviews={product.reviews}/>

        </div>

    );
};

export default GetSingleProduct;
