import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFavoritesThunk } from '../../redux/favorites';
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

    return (
        <div className="favorites-page-container">
            <h1>Your Favorites</h1>
            <ul className="favorites-list">
                {favorites.map((fav: IFavorite) => (
                    <li key={fav.id} className="favorite-item">
                        <div className="favorite-product-info" onClick={() => handleClickProduct(fav.product_id)}>
                            <h2> Product #{fav.product_id}</h2>
                            <p> Name: {products[0]?.name}</p>
                            <p> Description: {products[0]?.description}</p>
                            <p> Rating: {products[0]?.avg_rating}</p>
                            {/* {fav.product?.name && <p>{fav.product.name}</p>} */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesPage;
