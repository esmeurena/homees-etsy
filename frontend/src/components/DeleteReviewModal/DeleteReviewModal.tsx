import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import React from 'react';
import { deleteAReviewThunk } from "../../redux/reviews";
import './DeleteReviewModal.css'

interface DeleteReviewModalProps {
    reviewId: number;
}

const DeleteReviewModal: React.FC<DeleteReviewModalProps> = ({ reviewId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await dispatch(deleteAReviewThunk(reviewId));
        closeModal();
    };

    return (
        <div className="review-form-container">
            <h1 id="heading">Confirm Delete</h1>
            <div>Are you sure you want to delete this review?</div>
            <button onClick={handleClickDelete} className="delete-review-modal-button">
                Yes (Delete Review)
            </button>
            <button onClick={closeModal} className="delete-review-modal-button">
                No (Keep Review)
            </button>
        </div>
    );
};

export default DeleteReviewModal;
