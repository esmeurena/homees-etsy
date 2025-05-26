import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { createReviewThunk, getAllReviewsThunk } from "../../../redux/reviews"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"
import "./ReviewFormModal.css"
import { getSingleProductThunk } from "../../../redux/products"


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
      newErrors.review = "Review must be at least 10 characters";
    } else if (review.length > 500) {
      newErrors.review = "Review must be less than 500 characters";
    }

    if (!stars || stars < 1 || stars > 5) {
      newErrors.stars = "Please select a star rating";
    }

    if (imageUrl) {
      if (
        !imageUrl.toLowerCase().endsWith(".jpg") &&
        !imageUrl.toLowerCase().endsWith(".jpeg") &&
        !imageUrl.toLowerCase().endsWith(".png")
      ) {
        newErrors.image =
          "Image can not be submitted. .jpg, .jpeg, or .png required";
      }
    }

    setErrors(newErrors);
  }, [review, stars, imageUrl]);


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
              await dispatch(getSingleProductThunk(productId));
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
    const validReview =
      review.length >= 10 &&
      review.length <= 500 &&
      stars > 0 &&
      (!imageUrl ||
        imageUrl.toLowerCase().endsWith(".jpg") ||
        imageUrl.toLowerCase().endsWith(".jpg") ||
        imageUrl.toLowerCase().endsWith(".png")); 
    return (
      <div id="review-form">
        <h1 id="review-form-title">Leave Feedback</h1>
        <hr id="review-form-line"></hr>

        {serverError && <p className="error-message">{serverError}</p>}
        {errors.review && <p className="error-message">{errors.review}</p>}
        {errors.stars && <p className="error-message">{errors.stars}</p>}
        {errors.image && <p className="error-message">{errors.image}</p>}

        <form onSubmit={handleSubmit} id="review-form-form">
          <textarea
            id="review-form-review"
            placeholder="Leave your review here"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={6}
          />
          <div id="review-form-stars">
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
          <div>
            <label id="review-form-photo">
              <b>Add Photo</b>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="URL"
                id="review-form-photo-url"
              ></input>
            </label>
            {imageUrl && (
              <div className="image-preview">
                <img src={imageUrl} alt="Review preview" />
              </div>
            )}
          </div>
          <button type="submit" disabled={!validReview} id="review-form-submit">
            Submit Your Review
          </button>
        </form>
      </div>
    );
}



export default ReviewFormModal;
