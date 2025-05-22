import './AllReviews.css';
import ReviewCard from '../ReviewCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const AllReviews = () => {
const reviews = useSelector((state: RootState) => state.reviews.allReviews);
  return (
    <div id="all-reviews">
      {reviews.length &&
        reviews.map((review, i) => {
          return (
            <div key={`${review.id}-${i}`} className="all-reviews-review">
              <ReviewCard review={review} productId={review.product_id} />
              <hr id="all-reviews-line"></hr>
            </div>
          );
        })}
    </div>
  );
};

export default AllReviews;
