import './AllReviews.css';
import ReviewCard from '../ReviewCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewModal from '../DeleteReviewModal';

const AllReviews = () => {
  const reviews = useSelector((state: RootState) => state.reviews.allReviews);
  const currentUser = useSelector((state: RootState) => state.session.user);
  return (
    <div id="all-reviews">
      {reviews.length &&
        reviews.map((review, i) => {
          return (
            <div key={`${review.id}-${i}`} className="all-reviews-review">
              <ReviewCard review={review} productId={review.product_id} />
              {/* {currentUser && currentUser.id === review.user.id ?
              <OpenModalButton
                buttonText="Delete Review"
                buttonClassName="delete-btn"
                modalComponent={<DeleteReviewModal reviewId={review.id} />}
               />
              : ''} */}
              <hr id="all-reviews-line"></hr>
            </div>
          );
        })}
    </div>
  );
};

export default AllReviews;
