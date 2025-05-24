import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../context/Modal'
import { getAllReviewsThunk, updateAReviewThunk } from '../../../redux/reviews'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import './UpdateReviewModal.css'

interface UpdateReviewModalProps {
    reviewId: number;
    productId: number;
}

interface ReviewErrors {
    review?: string;
    stars?: string;
}

const UpdateReviewModal = ({ reviewId, productId }: UpdateReviewModalProps) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currentReview = useSelector((state: any) => state.reviews.byId[reviewId])

    const [review, setReview] = useState('');
    const [stars, setStars] = useState<number>(0);
    const [errors, setErrors] = useState<ReviewErrors>({})
    const [hoveredStar, setHoveredStar] = useState(0)
    const [serverError, setServerError] = useState("");


    useEffect(() => {
        if (currentReview) {
            setReview(currentReview.review);
            setStars(currentReview.stars)
        }
    }, [currentReview])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setServerError("");

        const reviewData = {
            product_id: productId,
            review,
            stars: Number(stars),
        };

        try {
            const res = await dispatch(updateAReviewThunk(reviewId, reviewData));
            if (res.id) {
                dispatch(getAllReviewsThunk(productId))
                closeModal();
            } else if (res.errors) {
                setErrors(res.errors)
            } else {
                setServerError(res.message)
            }
        } catch (error: any) {
                setServerError("An error occurred")

        }
    }
    const validReview = review.length >= 10 && stars > 0;


        return (

            <div id='review-form'>
                <h1 id='review-form-title'>Edit Your Review</h1>
                <hr id='review-form-line'></hr>
                {serverError && <p>{serverError}</p>}
                {errors.review && <p>{errors.review}</p>}

                <form onSubmit={handleSubmit} id='review-form-form'>
                    <textarea
                        placeholder="Leave your review here"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        rows={6}
                         id='review-form-review'
                    />
                    <div id='review-form-stars'>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <FontAwesomeIcon
                                key={num}
                                icon={num <= (hoveredStar || stars) ? fasStar : farStar}
                                className="star-icon"
                                onClick={() => setStars(num)}
                                onMouseEnter={() => setHoveredStar(num)}
                                onMouseLeave={() => setHoveredStar(0)}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={!validReview}
                        id='review-form-submit'
                    >
                        Submit Your Review
                    </button>
                </form>
            </div>
        )


}


















export default UpdateReviewModal

