import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { createReviewThunk, getAllReviewsThunk } from "../../../redux/reviews"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"
import "./ReviewFormModal.css"


interface ReviewFormModalProps {
    productId: number;
}

interface ReviewErrors {
    review?: string;
    stars?: string;
    image?: string;
}

const ReviewFormModal = ({ productId }: ReviewFormModalProps) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState<ReviewErrors>({})
    const [hoveredStar, setHoveredStar] = useState(0);
    const [serverError, setServerError] = useState("");
    const [imageUrl, setImageUrl] = useState("")

  
  useEffect(() => {
    const newErrors: ReviewErrors = {};

    if (!review.trim()) {
      newErrors.review = "Review is required";
    } else if (review.length < 10) {
      newErrors.review = "Review must be at least 10 characters"
    } else if (review.length > 500) {
      newErrors.review = "Review must be less than 500 characters"
    }

    if (!stars || stars < 1 || stars > 5) {
      newErrors.stars = "Please select a star rating"
    }

    if (imageUrl) {
      if (!imageUrl.toLowerCase().endsWith(".jpg") && !imageUrl.toLowerCase().endsWith(".jpeg") && !imageUrl.toLowerCase().endsWith(".png")) {
        newErrors.image = "Image can not be submitted. .jpg, .jpeg, or .png required"
      }
    }

    setErrors(newErrors)
  }, [review, stars, imageUrl])
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setServerError("")

        const reviewData = {
            product_id: productId,
            review,
            stars,
            image_url: imageUrl,
        };

        try {
            const res = await dispatch(createReviewThunk(reviewData));
            if (!res.errors) {
                await dispatch(getAllReviewsThunk(productId));
                closeModal();
            } else {
                setErrors(res.errors);
            }
        } catch (error) {
            if (error instanceof Response) {
                const data = await error.json();
                if (data && data.message) {
                    setServerError(data.message);
                } else if (data && data.errors) {
                    setErrors(data.errors)
                }
            }
        }
    };


  const validReview = review.length >= 10 &&
    review.length <= 500 &&
    stars > 0 &&
    (!imageUrl ||
      imageUrl.toLowerCase().endsWith(".jpg") ||
      imageUrl.toLowerCase().endsWith(".jpg") ||
      imageUrl.toLowerCase().endsWith(".png")); 


    return (
      <>
        <h1>Leave Feedback</h1>

        {serverError && <p>{serverError}</p>}
        {errors.review && <p>{errors.review}</p>}
        {errors.stars && <p>{errors.stars}</p>}
        {errors.image && <p>{errors.image}</p>}

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Leave your review here"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={6}
          />
          <div className="stars-submit">
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
            <span>Stars</span>
          </div>

                <div>
                    <label>
                        Add Photo (optional):
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Add photo"
                        ></input>
                    </label>
                    {imageUrl && (
                        <div className="image-preview">
                            <img src={imageUrl} alt="Review preview" />
                            </div>
                    )}
                </div>
          <button
            type="submit"
            disabled={!validReview}
            className="submit-review-button"
          >
            Submit Your Review
          </button>
        </form>
      </>
    );
}



export default ReviewFormModal;