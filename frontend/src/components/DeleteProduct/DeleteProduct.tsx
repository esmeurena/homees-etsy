import { useDispatch } from 'react-redux';
import { deleteProductThunk } from '../../redux/products';
import './DeleteProduct.css';

interface Props {
    productId: number;
}

const DeleteProduct = ({ productId }: Props) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete){
            await dispatch(deleteProductThunk(productId));
        }

    };

    return (
        <button className="delete-button" onClick={handleDelete}>
            Delete
        </button>
    );
};

export default DeleteProduct;
