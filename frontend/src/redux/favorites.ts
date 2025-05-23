/****************************
↓↓↓↓↓↓↓↓↓↓ IMPORTS ↓↓↓↓↓↓↓↓↓↓
 ***************************/

import { IFavorite, IFavoriteState, IActionCreator } from "./types/favorites";


/*********************************
↓↓↓↓↓↓↓↓↓↓ ACTION TYPES ↓↓↓↓↓↓↓↓↓↓
 ********************************/
const GET_ALL_FAVORITES = "favorites/GET_ALL_FAVORITES";


/************************************
↓↓↓↓↓↓↓↓↓↓ ACTION CREATORS ↓↓↓↓↓↓↓↓↓↓
 ***********************************/
const getAllFavorites = (favorites: IFavorite[]) => ({
    type: GET_ALL_FAVORITES,
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
            return data.Products;
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return (await err.json());
    }
}


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

        default:
            return state;


        }
}

export default favoritesReducer;
