import { NavLink, useNavigate } from 'react-router-dom';
import './ProductCard.css';
import { IUser } from '../../redux/types/session';
import { IProductImage } from '../../redux/types/products';

interface ProductProps {
    id: number,
    name: string,
    price: number,
    image: string,
    User: IUser,
    product_images: Array<IProductImage>,
    avg_rating: number
}

const navigate = useNavigate();

const goToCreateProduct = () => {
    navigate('/products/create');
  };

const ProductCard = ({name, price, User, product_images, avg_rating}: ProductProps): JSX.Element => {

    return (
        <NavLink id='product-card' to=''> {/* FILL THIS IN FOR GET A PRODUCT*/}
            <img id='product-card-image'src={
                product_images.find(image => image.preview === true)?.url
                }
            />
            <div>
                <div id='product-card-name-review'>
                    <p className='product-card-text'>{name}</p>
                    <b className='product-card-text'>&#9733;{avg_rating}</b>
                </div>
                <b className='product-card-text'>${price}</b>
                <p className='product-card-text' style={{color: '#595959'}}>{User.first_name} {User.last_name}</p>
            </div>

            <button className="profile-buttons" onClick={goToCreateProduct}>
                  Create a Product
                </button>
        </NavLink>


    )
}

export default ProductCard;
