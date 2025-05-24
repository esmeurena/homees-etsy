import { NavLink } from 'react-router-dom';
import './ProductCard.css';
import { IUser } from '../../redux/types/session';
import { IProductImage } from '../../redux/types/products';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoritesThunk } from '../../redux/favorites';

interface ProductProps {
    id: number,
    name: string,
    price: number,
    image: string,
    User: IUser,
    product_images: Array<IProductImage>,
    avg_rating: number
}

const ProductCard = ({id, name, price, User, product_images, avg_rating}: ProductProps): JSX.Element => {
    const dispatch = useDispatch();
    // const favorites = useSelector((state: RootState) => state.favorites.allFavorites);
    const [heartFill, setheartFill] = useState("♡");


    // for(let i = 0; i < favorites.length; i++){
    //     // console.log("inside loop = ", favorites[i].product_id, " == ",id, " is ", (favorites[i].product_id == id));
    //     if(favorites[i].product_id == id){
    //         setheartFill('♥︎');
    //     }
    // }

    const AddToFavoritesHeart = async () => {

        if (heartFill == '♡') {
            await dispatch(addFavoritesThunk(id));
            alert('Added to favorites!');
            setheartFill('♥︎');
        } else {
            setheartFill('♡');
            alert('Removed from favorites!');
        }
    };

    return (
        <div>
            <button
                className='heart'
                onClick={AddToFavoritesHeart}
            >
                {heartFill}
            </button>
            <NavLink id='product-card' to={`/products/${id}`}>
                <img id='product-card-image' src={
                    product_images.find(image => image.preview === true)?.url
                }
                />
                <div>
                    <div id='product-card-name-review'>
                        <p className='product-card-text'>{name}</p>
                        <b className='product-card-text'>&#9733;{avg_rating}</b>
                    </div>
                    <b className='product-card-text'>${price}</b>
                    <p className='product-card-text' style={{ color: '#595959' }}>{User.first_name} {User.last_name}</p>
                </div>
            </NavLink>
        </div>
    )
}

export default ProductCard;