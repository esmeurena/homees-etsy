import './AllReviews.css';
import ReviewCard from '../ReviewCard';
import { IAllReviews } from '../../redux/types/reviews';

const AllReviews = ({reviews}: IAllReviews) => {
    return (
        <div id="all-reviews">
            {reviews.length && reviews.map((review, i) => {
                return (
                    <div key={`${review.id}-${i}`} className='all-reviews-review'>
                        <ReviewCard review={review}/>
                        <hr id='all-reviews-line'></hr>
                    </div>
                )
            })}
        </div>
    )
}

export default AllReviews;
