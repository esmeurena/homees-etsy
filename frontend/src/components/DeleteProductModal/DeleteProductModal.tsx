import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { deleteAProductThunk } from '../../redux/products';
import React from 'react';

interface DeleteProductModalProps {
    productId: number;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ productId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await dispatch(deleteAProductThunk(productId));
        closeModal();
    };

    return (
        <div className="review-form-container">
            <h1 id="heading">Confirm Delete</h1>
            <div>Are you sure you want to delete this product from the listings?</div>
            <button onClick={handleClickDelete} className="delete-review-button">
                Yes (Delete Product)
            </button>
            <button onClick={closeModal} className="keep-review-button">
                No (Keep Product)
            </button>
        </div>
    );
};

export default DeleteProductModal;
