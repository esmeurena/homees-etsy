/****************************
↓↓↓↓↓↓↓↓↓↓ IMPORTS ↓↓↓↓↓↓↓↓↓↓
 ***************************/

import { IReviewState } from './types/reviews';
import { IActionCreator } from './types/products';

/*********************************
↓↓↓↓↓↓↓↓↓↓ ACTION TYPES ↓↓↓↓↓↓↓↓↓↓
 ********************************/

const DELETE_A_REVIEW = 'reviews/DELETE_A_REVIEW';

/************************************
↓↓↓↓↓↓↓↓↓↓ ACTION CREATORS ↓↓↓↓↓↓↓↓↓↓
 ***********************************/

const deleteAReview = (review: number) => ({
    type: DELETE_A_REVIEW,
    payload: review
});


/***************************
↓↓↓↓↓↓↓↓↓↓ THUNKS ↓↓↓↓↓↓↓↓↓↓
 **************************/

export const deleteAReviewThunk = (reviewId: number): any => async (dispatch: any) => {
  try {
    const res = await fetch(`/api/products/${reviewId}`, {
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