/****************************
↓↓↓↓↓↓↓↓↓↓ IMPORTS ↓↓↓↓↓↓↓↓↓↓
 ***************************/

import { IFavorite, IFavoriteState, IActionCreator } from "./types/favorites";


/*********************************
↓↓↓↓↓↓↓↓↓↓ ACTION TYPES ↓↓↓↓↓↓↓↓↓↓
 ********************************/
const GET_ALL_FAVORITES = "favorites/GET_ALL_FAVORITES";
const ADD_FAVORITE = "favorites/ADD_FAVORITE";


/************************************
↓↓↓↓↓↓↓↓↓↓ ACTION CREATORS ↓↓↓↓↓↓↓↓↓↓
 ***********************************/
const getAllFavorites = (favorites: IFavorite[]) => ({
    type: GET_ALL_FAVORITES,
    payload: favorites,
});

const addFavorite = (favorites: IFavorite) => ({
    type: ADD_FAVORITE,
    payload: favorites,
});



/***************************
↓↓↓↓↓↓↓↓↓↓ THUNKS ↓↓↓↓↓↓↓↓↓↓
 **************************/
export const getAllFavoritesThunk = (): any => async (dispatch: any) => {
    try {
        const res = await fetch('/api/favorites');
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw res;
            }
            dispatch(getAllFavorites(data))

    }
  } catch (error) {
    return error;
  }
};

export const addFavoritesThunk = (productId: IFavorite): any => async (dispatch: any) => {
  try {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId })
    });

    if (res.ok) {
      const data: IFavorite = await res.json();
      dispatch(addFavorite(data));
    }
  } catch (error) {
    return error;
  }
};


/**********************************
↓↓↓↓↓↓↓↓↓↓ INITIAL STATE ↓↓↓↓↓↓↓↓↓↓
 *********************************/
const initialState: IFavoriteState = {
    allFavorites: [],
    byId: {},
};

/****************************
↓↓↓↓↓↓↓↓↓↓ REDUCER ↓↓↓↓↓↓↓↓↓↓
 ***************************/
function favoritesReducer(state = initialState, action: IActionCreator) {
    let newState;

    switch (action.type) {
        case GET_ALL_FAVORITES:
            const favorites = action.payload.Favorites;
            newState = { ...state };
            newState.allFavorites = favorites;
            let newByIdGetAllFavorites: { [id: number]: IFavorite } = {};
            for (let favorite of favorites) {
                newByIdGetAllFavorites[favorite.id] = favorite;
            }
            newState.byId = newByIdGetAllFavorites;
            newState.allFavorites = favorites;
            return newState;

        case ADD_FAVORITE:
            newState = { ...state }
            newState.allFavorites = [...newState.allFavorites, action.payload]
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload }
            return newState;


        default:
            return state;


        }
}

export default favoritesReducer;
