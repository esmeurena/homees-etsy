
/****************************
↓↓↓↓↓↓↓↓↓↓ IMPORTS ↓↓↓↓↓↓↓↓↓↓
 ***************************/

import { IReview, IReviewState, IActionCreator, ICreateReview } from "./types/reviews";

/*********************************
↓↓↓↓↓↓↓↓↓↓ ACTION TYPES ↓↓↓↓↓↓↓↓↓↓
 ********************************/

const CREATE_A_REVIEW = "reviews/createReview"
const GET_ALL_REVIEWS = "reviews/GET_ALL_REVIEWS"
const UPDATE_A_REVIEW = 'review/update_a_review'
const DELETE_A_REVIEW = 'reviews/DELETE_A_REVIEW';

/************************************
↓↓↓↓↓↓↓↓↓↓ ACTION CREATORS ↓↓↓↓↓↓↓↓↓↓
 ***********************************/
const createReview = (review: IReview) => ({
  type: CREATE_A_REVIEW,
  payload: review,
});

const getAllReviews = (reviews: IReview[]) => ({
    type: GET_ALL_REVIEWS,
    payload: reviews,
})

const updateReview = (reviews: IReview) => ({
    type: UPDATE_A_REVIEW,
    payload: reviews,
})

const deleteAReview = (review: number) => ({
    type: DELETE_A_REVIEW,
    payload: review
});


/***************************
↓↓↓↓↓↓↓↓↓↓ THUNKS ↓↓↓↓↓↓↓↓↓↓
 **************************/
export const createReviewThunk = (review: ICreateReview): any => async (dispatch: any) => {
    try {
        const res = await fetch("/api/reviews/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
        });

        if (res.ok) {
            const data: IReview = await res.json();
            dispatch(createReview(data));
            return data
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return await err.json();
    }
}

export const getAllReviewsThunk = (productId: number): any => async (dispatch: any) => {
    try {
        const res = await fetch(`/api/reviews/products/${productId}`);
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw res;
            }
            dispatch(getAllReviews(data))
            return data;
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return await err.json();
    }
}

export const updateAReviewThunk = (reviewId: number, review: ICreateReview): any => async(dispatch: any) => {
    try {

        const response = await fetch(`/api/reviews/${reviewId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(review)
        });

        if (response.ok) {
        
        const data : IReview = await response.json();
          dispatch(updateReview(data));
          return data;
        } else {
            throw response;
        }
    } catch (e){
        const err = e as Response;
        return (await err.json())
    }
};

export const deleteAReviewThunk = (reviewId: number): any => async (dispatch: any) => {
  try {
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(deleteAReview(reviewId));
    } else {
      throw res;
    }
  } catch (e) {
    const err = e as Response;
    return await err.json();
  }
};


/**********************************
↓↓↓↓↓↓↓↓↓↓ INITIAL STATE ↓↓↓↓↓↓↓↓↓↓
 *********************************/

const initialState: IReviewState = {
    byId: {},
    allReviews: []
};

/****************************
↓↓↓↓↓↓↓↓↓↓ REDUCER ↓↓↓↓↓↓↓↓↓↓
 ***************************/

function reviewsReducer(state = initialState, action: IActionCreator) {

    let newState;
    switch (action.type) {
         case CREATE_A_REVIEW:
            newState = { ...state }
            newState.allReviews = [...newState.allReviews, action.payload]
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload }
            return newState;
        
        case GET_ALL_REVIEWS:
            const reviews = action.payload.Reviews
            newState = { ...state };
            newState.allReviews = reviews
            let newByIdGetAllReviews: { [id: number]: IReview } = {};
            for (let review of reviews) {
                newByIdGetAllReviews[review.id] = review;
            }
            newState.byId = newByIdGetAllReviews;
            return newState;

        case UPDATE_A_REVIEW:
            newState = { ...state };
            newState.allReviews = [...newState.allReviews, action.payload];
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload };

            return newState;

        case DELETE_A_REVIEW:
            newState = { ...state };
            newState.allReviews = state.allReviews.filter(review => review.id !== action.payload);
            const newById = { ...state.byId };
            delete newById[action.payload];
            newState.byId = newById;

            return newState;
        


        default:
            return state;
    }
}





export default reviewsReducer;