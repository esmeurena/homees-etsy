import './AllReviews.css';
import ReviewCard from '../ReviewCard';
import { IAllReviews } from '../../redux/types/reviews';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewModal from '../DeleteReviewModal';

const AllReviews = ({reviews}: IAllReviews) => {
    return (
        <div id="all-reviews">
            {reviews.length && reviews.map((review, i) => {
                return (
                    <div key={`${review.id}-${i}`} className='all-reviews-review'>
                        <ReviewCard review={review} productId={0}/>

                            <OpenModalButton
                                buttonText="Delete Review"
                                buttonClassName="delete-btn"
                                modalComponent={<DeleteReviewModal reviewId={review.id} />}
                            />       
                                             
                        <hr id='all-reviews-line'></hr>
                    </div>
                )
            })}
        </div>
    )
}

export default AllReviews;
