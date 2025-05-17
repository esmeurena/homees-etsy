import { NavLink } from 'react-router-dom';
import './ProductCard.css';

interface ProductProps {
    id: number,
    name: string,
    price: number,
    image: string,
    user: string,
    previewImage: string,
    avgRating: number
}

const ProductCard = ({name, price, user, previewImage, avgRating}: ProductProps): JSX.Element => {

    return (
        <NavLink id='product-card' to=''> {/* FILL THIS IN FOR GET A PRODUCT*/}
            <img id='product-card-image' src={previewImage}/>
            <div>
                <div id='product-card-name-review'>
                    <p className='product-card-text'>{name}</p>
                    <b className='product-card-text'>&#9733;{avgRating}</b>
                </div>
                <b className='product-card-text'>${price}</b>
                <p className='product-card-text' style={{color: '#595959'}}>{user}</p>
            </div>
        </NavLink>
    )
}

export default ProductCard;
