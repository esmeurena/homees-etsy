import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ProductCard.css';
import { RootState } from '../../redux/store';
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

const ProductCard = ({ id, name, price, User, product_images, avg_rating }: ProductProps): JSX.Element => {
    const currentUser = useSelector((state: RootState) => state.session.user);
    const navigate = useNavigate();

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // prevent NavLink navigation
        if (!confirm('Are you sure you want to delete this product?')) return;

        const res = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            alert('Product deleted successfully');
            window.location.reload(); // or lift state up to refresh
        } else {
            const error = await res.json();
            alert(error.error || 'Delete failed');
        }
    };

    return (
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

                {currentUser?.id === User.id && (
                    <button className='delete-btn' onClick={handleDelete}>
                        Delete
                    </button>
                )}
            </div>
        </NavLink>
    );
};

export default ProductCard;
