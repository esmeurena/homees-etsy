import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GetSingleProduct.css';
import { useParams } from 'react-router-dom';
import { getSingleProductThunk } from '../../redux/products';
import { RootState } from '../../redux/store';
import OpenModalButton from '../OpenModalButton';
import ReviewFormModal from '../AllProducts/ReviewFormModal/ReviewFormModal';
import { addItemToShoppingCartThunk } from '../../redux/shopping_cart';
import DeleteProductModal from '../DeleteProductModal';
import AllReviews from '../AllReviews';

import { getAllReviewsThunk } from '../../redux/reviews';

const GetSingleProduct = (): JSX.Element => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();
    const productId = Number(id);

    const product = useSelector((state: RootState) => state.products.byId[Number(id)]);
    const currentUser = useSelector((state: RootState) => state.session.user);
    const allReviews = useSelector((state: RootState) => state.reviews.allReviews);
    // const product: IProduct = useSelector((state: RootState) => state.products.byId[Number(id)]);
    const reviews = allReviews.filter(review => review.product_id === productId)

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

    if (!isLoaded || !product) {
        return <h1>Loading...</h1>;
    }

const addItemToCart = async () => {

    await dispatch(addItemToShoppingCartThunk(product.id));
};

const hasReviewed = reviews.find((review) => review.user_id === currentUser?.id) !== undefined
    return (
        <div id='single-product'>
            <div id='single-product-images-text'>
                <div>
                    <div id='single-product-images-container'>
                        <div id='single-product-images-list'>
                            {product.product_images.map((image: { url: string | undefined; }) => {
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
                        <button onClick={addItemToCart} className='single-product-buttons
                                           single-product-add-to-cart'>
                        Add to cart
                        </button>
                    </div>
                    <h3>Item details</h3>
                    <p>{product.description}</p>
                {currentUser?.id === product.user_id && (
                    <div id='single-product-update-delete-container'>
                    <NavLink to={`/products/${Number(id)}/update`}
                    className='single-product-update-delete'>
                        Update Product
                    </NavLink>
                    <OpenModalButton
                        buttonText="Delete Product"
                        buttonClassName="single-product-update-delete"
                        modalComponent={<DeleteProductModal productId={Number(id)}/>}
                    />
                    </div>
                )}
                </div>
            </div>
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
            {/* make sure its a purchasing customer for the if conditional*/}
            {currentUser && !hasReviewed && (
                <OpenModalButton
                    buttonText="Write a review"
                    buttonClassName="single-product-write-review"
                    modalComponent={<ReviewFormModal productId={Number(id)} />}
                />
            )}
            <AllReviews/>
        </div>
    );
};

export default GetSingleProduct;
