import './ReviewCard.css';
import { IReview, IReviewCard } from '../../redux/types/reviews';
import { useModal } from '../../context/Modal'
import UpdateReviewModal from '../AllProducts/UpdateAReview';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewModal from '../DeleteReviewModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'

interface ReviewCardProps {
    review: IReview;
    currentUserId?: number;
    productId: number;
}


const ReviewCard = ({ review, currentUserId, productId }: ReviewCardProps) => {
    const { setModalContent } = useModal();
    const currentUser = useSelector((state: RootState) => state.session.user)
    const reviewDate = (reviewDate: string) => {
        const splReviewDate: string[] = reviewDate.split(' ');
        const constructedReviewDate: string =
        `${splReviewDate[2]} ${splReviewDate[1]}, ${splReviewDate[3]}`
        return constructedReviewDate;
    }

    return (
        <div id='review-card'>
            <div id='review-card-stars'>
                {Array(review.stars).fill(0).map((_, i) => (
                    <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        style={{marginRight: "2px"}}
                    />
                ))}
            </div>
            <span style={{fontSize: '1.1rem'}}>{review.review}</span>
                {review.review_images.map((image, i) => {
                    return (
                        <img key={`${image.id}-${i}`}
                             id='review-card-review-image'
                             src={image.url}/>
                    )
                })}
            <div id="review-card-review-user-date-container">
                <span className="review-card-review-user-date">
                    {review.user.first_name} {review.user.last_name}
                </span>
                <span className='review-card-review-user-date'>
                    {reviewDate(review.updated_at)}
                </span>
            </div>
            { currentUser && currentUser.id === review.user.id && (
                <div id='review-card-buttons'>
                <button
                    className='update-delete-button'
                    onClick={() =>
                        setModalContent(
                            <UpdateReviewModal
                                reviewId={review.id}
                                productId={productId}
                            />
                        )
                    }
                >
                    Edit
                </button>
                <OpenModalButton
                        buttonText="Delete"
                        buttonClassName="delete-btn"
                    modalComponent={<DeleteReviewModal reviewId={review.id} />}
                />
               </div>
                )}
        </div>
    )
}

export default ReviewCard;
