import { NavLink } from 'react-router-dom';
import './ProductCard.css';
import { IUser } from '../../redux/types/session';
import { IProductImage } from '../../redux/types/products';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoritesThunk } from '../../redux/favorites';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { RootState } from '../../redux/store';

interface ProductProps {
    id: number,
    name: string,
    price: number,
    image: string,
    User: IUser,
    product_images: Array<IProductImage>,
    avg_rating: number
}

const ProductCard = ({ id, name, price, User, product_images, avg_rating }: ProductProps): JSX.Element => {
    const dispatch = useDispatch();
    const [heartFill, setheartFill] = useState(false);
    const currentUser = useSelector((state: RootState) => state.session.user);


    const AddToFavoritesHeart = async () => {

        if (!heartFill) {
            await dispatch(addFavoritesThunk(id));
            setheartFill(true);
        } else {
            setheartFill(false);
        }
    };

    return (
        <div className="product-and-heart">
            {currentUser ?
                <button
                    className='heart'
                    onClick={AddToFavoritesHeart}
                >
                    <FontAwesomeIcon
                        icon={heartFill ? faHeartSolid : faHeartRegular}
                        style={{ color: "#F1641E", zIndex: -1 }}
                    />
                    {heartFill}
                </button>
                : ''}
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
