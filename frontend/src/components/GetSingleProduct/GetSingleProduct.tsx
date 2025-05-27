import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GetSingleProduct.css';
import { useParams } from 'react-router-dom';
import { getSingleProductThunk } from '../../redux/products';
import { RootState } from '../../redux/store';
import OpenModalButton from '../OpenModalButton';
import ReviewFormModal from '../AllProducts/ReviewFormModal/ReviewFormModal';
import { addItemToShoppingCartThunk, updateItemInShoppingCartThunk } from '../../redux/shopping_cart';
import DeleteProductModal from '../DeleteProductModal';
import AllReviews from '../AllReviews';
import { IReview } from '../../redux/types/reviews';
import { getAllReviewsThunk } from '../../redux/reviews';
import { addFavoritesThunk } from '../../redux/favorites';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const GetSingleProduct = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();
    const [image_clicked, set_image_clicked] = useState<string>();
    const shoppingCart = useSelector((state: RootState) => state.shopping_cart.allShoppingCartItems);
    const [isClicked, setIsClicked] = useState(false);
    const [textInsideButton, setTextInsideButton] = useState("Add to cart");
    const product = useSelector((state: RootState) => state.products.byId[Number(id)]);
    const currentUser = useSelector((state: RootState) => state.session.user);
    const reviews = useSelector((state: RootState) => state.reviews.allReviews);

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

    const makeButtonGreen = async () => {
        let added_to_cart = false;
        for(let i = 0; i < shoppingCart.length; i++){
            if(shoppingCart[i].product_id == product.id ){
                added_to_cart = true;
            }
        }

        if(added_to_cart) {
            const new_item_count = product.item_count + 1;
            await dispatch(updateItemInShoppingCartThunk(product.id, new_item_count));
        } else {
            await dispatch(addItemToShoppingCartThunk(product.id));
        }
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
                        <button
                            className='add-to-favorite'
                            onClick={handleAddToFavorites}>
                            Add to Favorites
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
                            style={{ backgroundColor: isClicked ? 'green' : '#222222', color: isClicked ? 'white' : 'white'}}>
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
                        buttonClassName='update-delete-button'
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginRight: '.8rem' }}>{product.reviews.length} Reviews -</h2>
                <div style={{ width: '8.4rem', marginTop: '.6rem', display: 'flex' }}>
                    {[1, 2, 3, 4, 5].map((i) => {
                        if (product.avg_rating >= i) {
                            return (<FontAwesomeIcon key={i} icon={fasStar} style={{ fontSize: "1.1rem"}}/>);
                        } else if (product.avg_rating >= i - 0.5) {
                            return (
                              <FontAwesomeIcon
                                key={i}
                                icon={faStarHalfAlt}
                                style={{ fontSize: "1.1rem" }}
                              />
                            );
                        } else {
                            return (
                              <FontAwesomeIcon
                                key={i}
                                icon={farStar}
                                style={{ fontSize: "1.1rem" }}
                              />
                            );
                        }
                    })}
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
