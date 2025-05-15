import { NavLink } from 'react-router-dom';
import './ProductCard.css';

interface ProductProps {
    id: number,
    name: string,
    description: string,
    price: number,
    owner: string,
    image: string,
}

const ProductCard = ({name, description, price, owner, image}: ProductProps): JSX.Element => {


    return (
        <NavLink id='product-card' to=''> {/* FILL THIS IN FOR GET A PRODUCT*/}
            <img id='product-card-image' src={image}/>
            <div>
            <p className='product-card-text'>{name}</p>
            <b className='product-card-text'>${price}</b>
            <p className='product-card-text' style={{color: '#595959'}}>{owner}</p>
            </div>
        </NavLink>
    )
}

export default ProductCard;
