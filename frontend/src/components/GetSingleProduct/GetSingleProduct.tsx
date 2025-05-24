import { NavLink, useNavigate } from 'react-router-dom';
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
import { IReview } from '../../redux/types/reviews';

import { getAllReviewsThunk } from '../../redux/reviews';

const GetSingleProduct = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();
    const [image_clicked, set_image_clicked] = useState<string>();
    const productId = Number(id);
    const [isClicked, setIsClicked] = useState(false);
    const [textInsideButton, setTextInsideButton] = useState("Add to cart");
    const product = useSelector((state: RootState) => state.products.byId[Number(id)]);
    const currentUser = useSelector((state: RootState) => state.session.user);
    const reviews = useSelector((state: RootState) => state.reviews.allReviews);
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

    useEffect(() => {
        if (product?.product_images?.length) {
            set_image_clicked(product.product_images[0].url);
        }
    }, [product]);

    if (!isLoaded || !product) {
        return <h1>Loading...</h1>;
    }

const addItemToCart = async () => {

    await dispatch(addItemToShoppingCartThunk(product.id));
};

    const makeButtonGreen = async () => {
        await dispatch(addItemToShoppingCartThunk(product.id));
        setIsClicked(true);
        if (textInsideButton === 'Add to cart') {
            setTextInsideButton('Added to cart ✓');
        } else {
            setTextInsideButton('Add to cart');
        }
    };

    const hasReviewed = reviews.some(
        (review: IReview) => review.user?.id === currentUser?.id
    )
    return (
        <div id='single-product'>
            <div id='single-product-images-text'>
                <div>
                    <div id='single-product-images-container'>
                        <div id='single-product-images-list'>
                            {product.product_images.map((image: { url: string | undefined }, imageId: number) => {
                                return (
                                    <img key={imageId} onClick={() => set_image_clicked(image.url)} className='single-product-images-list-image' src={image.url} />
                                )
                            })}
                        </div>
                        <img id='single-product-image'
                            //  src={product.product_images[0].url} />
                            src={image_clicked ?? ''} />
                    </div>
                </div>
                 {/* <div id='single-product-text'>
                    <h2 style={{fontSize: '2rem', marginBottom: '0'}}>${product.price}</h2>
                    <p>{product.name}</p>
                    <div id='single-product-buttons-container'>
                        <button className='single-product-buttons
                                           single-product-buy-it-now' onClick={() => navigate(`/singletransaction/${id}`)}>
                        Buy it now
                        </button>
                        <button
                            className='single-product-buttons single-product-buy-it-now'
                            onClick={makeButtonGreen}
                            style={{ backgroundColor: isClicked ? 'green' : 'initial' }}>
                            {textInsideButton}
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
                </div> */}
                <div id='single-product-text'>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0' }}>${product.price}</h2>
                    <p>{product.name}</p>
                    <div id='single-product-buttons-container'>
                        <button className='single-product-buttons
                                           single-product-buy-it-now' onClick={() => navigate(`/singletransaction/${id}`)}>
                            Buy it now
                        </button>
                        <button
                            className='single-product-buttons single-product-add-to-cart'
                            onClick={makeButtonGreen}
                            style={{ backgroundColor: isClicked ? 'green' : '#222222', color: isClicked ? 'black' : 'white'}}>
                            {textInsideButton}
                        </button>
                    </div>
                    <h3>Item details</h3>
                    <p>{product.description}</p>
                {currentUser?.id === product.user_id && (
                    <div id='single-product-update-delete-container'>
                    <NavLink to={`/products/${Number(id)}/update`}
                    className='update-delete-button'>
                        Update Product
                    </NavLink>
                    <OpenModalButton
                        buttonText="Delete Product"
                        // buttonClassName='update-delete-button'
                        modalComponent={<DeleteProductModal productId={Number(id)}/>}
                    />
                    </div>
                )}
                </div>
            </div>
            {/* <NavLink to={`/products/${Number(id)}/update`}
                id='single-product-update'>
                Update Product
            </NavLink> */}
            <div style={{ display: 'flex' }}>
                <h2 style={{ marginRight: '.4rem' }}>{product.reviews.length} Reviews -</h2>
                <div style={{ width: '8.4rem', marginTop: '.5rem' }}>
                    <div style={{
                        width: `${product.avg_rating * 20}%`,
                        backgroundColor: 'white', overflow: 'hidden'
                    }}>
                        <span style={{ width: '8.4rem', fontSize: '2rem' }}>
                            &#9733;&#9733;&#9733;&#9733;&#9733;
                        </span>
                    </div>
                </div>
            </div>

            {/* {currentUser?.id === product.user_id && (
                <>
                    <NavLink to={`/products/${Number(id)}/update`}>
                        Update a Product
                    </NavLink>
                    <OpenModalButton
                        buttonText="Delete"
                        buttonClassName="delete-btn"
                        modalComponent={<DeleteProductModal productId={Number(id)} />}

                    />
                </>
            )} */}
            {/* make sure its a purchasing customer for the if conditional*/}
            {currentUser && !hasReviewed &&  currentUser.id !== product.user_id &&(
                <OpenModalButton
                    buttonText="Write a review"
                    buttonClassName="single-product-write-review"
                    modalComponent={<ReviewFormModal productId={Number(id)} />}
                />
            )}
            <AllReviews />
        </div>
    );
};

export default GetSingleProduct;
