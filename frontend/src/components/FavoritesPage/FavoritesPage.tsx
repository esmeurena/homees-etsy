import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavoriteThunk, getAllFavoritesThunk } from '../../redux/favorites';
import { IFavorite } from '../../redux/types/favorites';
import { RootState, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import './FavoritesPage.css';


const FavoritesPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useAppSelector((state) => state.session.user);
    const favorites = useSelector((state: RootState) => state.favorites.allFavorites);
    const products = useSelector((state: RootState) => state.products.allProducts);

    useEffect(() => {
        dispatch(getAllFavoritesThunk());
    }, [dispatch]);

    const handleClickProduct = (productId: number) => {
        navigate(`/products/${productId}`);
    };

    if(!sessionUser){
        return <h2>Log in to add to your favorites!!</h2>;
    }else if (!favorites || favorites.length === 0) {
        return <div>No favorites yet!</div>;
    }

    // const deleteFavorite = (product_id: number) => {
    //     dispatch(deleteFavoriteThunk(product_id))
    //     // navigate("/favorites")
    // }

    const deleteFavorite = async (e: React.MouseEvent<HTMLButtonElement>, product_id: number) => {
            e.preventDefault();
            await dispatch(deleteFavoriteThunk(product_id));
    
            navigate("/favorites")
        };

    return (
        <div className="favorites-page-container">
            <h1>Your Favorites</h1>
            <ul className="favorites-list">
                {favorites.map((fav: IFavorite) => (
                    <li key={fav.id} className="favorite-item">
                        <div className="favorite-product-info" onClick={() => handleClickProduct(fav.product_id)}>
                            <img className="fav-image" src= {fav.product.product_images[0].url} />
                            <div className='info-right'>
                            <p> Description: {fav.product?.description}</p>
                            <p> Name: {fav.product?.name}</p>
                            <p> Rating: {fav.product?.avg_rating}</p>
                            <p> Price: ${fav.product?.price}</p>
                            <p> {fav.product?.avg_rating} </p>
                            </div>
                            <button onClick={(e) => deleteFavorite(e, fav.product_id)}>
                                Delete Favorite
                            </button>
                            {/* {fav.product?.name && <p>{fav.product.name}</p>} */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesPage;
