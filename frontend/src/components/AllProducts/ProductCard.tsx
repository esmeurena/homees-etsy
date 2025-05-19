import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './ProductCard.css';
import { RootState } from '../../redux/store';
import { IUser } from '../../redux/types/session';
import { IProductImage } from '../../redux/types/products';
import DeleteProductModal from '../DeleteProductModal';
import OpenModalButton from '../OpenModalButton';

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
    const currentUser = useSelector((state: RootState) => state.session.user);

    return (
        <div className="product-container">
            <NavLink id='product-card' to={`/products/${id}`}>
                <img
                    id='product-card-image'
                    src={product_images.find(image => image.preview)?.url}
                    alt={`${name} preview`}
                />
                <div>
                    <div id='product-card-name-review'>
                        <p className='product-card-text'>{name}</p>
                        <b className='product-card-text'>&#9733;{avg_rating}</b>
                    </div>
                    <b className='product-card-text'>${price}</b>
                    <p className='product-card-text' style={{ color: '#595959' }}>
                        {User.first_name} {User.last_name}
                    </p>
                </div>
            </NavLink>

            {currentUser?.id === User.id && (
                <OpenModalButton
                    buttonText="Delete"
                    buttonClassName="delete-btn"
                    modalComponent={<DeleteProductModal productId={id} />}
                    onButtonClick={() => {
                        console.log('Button clicked!');
                    }}
                    onModalClose={() => {
                        console.log('Modal closed!');
                    }}
                />
            )}
        </div>
    );
};

export default ProductCard;
