/****************************
↓↓↓↓↓↓↓↓↓↓ IMPORTS ↓↓↓↓↓↓↓↓↓↓
 ***************************/

// import { IShoppingCart, IShoppingCartItem, IActionCreator, IShoppingCartState } from './types/shopping_cart';
import { IShoppingCartItem, IActionCreator, IShoppingCartState } from './types/shopping_cart';


/*********************************
↓↓↓↓↓↓↓↓↓↓ ACTION TYPES ↓↓↓↓↓↓↓↓↓↓
 ********************************/

const ADD_ITEM_TO_SHOPPING_CART = "shopping_cart/addItemToShoppingCart";
const GET_ALL_SHOPPING_CART_ITEMS = "shopping_cart/getAllShoppingCartItems";
const DELETE_ITEM_FROM_SHOPPING_CART = "shopping_cart/deleteItemFromShoppingCart";

/************************************
↓↓↓↓↓↓↓↓↓↓ ACTION CREATORS ↓↓↓↓↓↓↓↓↓↓
 ***********************************/

const addItemToShoppingCart = (shopping_cart: IShoppingCartItem) => ({
  type: ADD_ITEM_TO_SHOPPING_CART,
  payload: shopping_cart
});

const getAllShoppingCartItems = (shopping_cart: IShoppingCartItem[]) => ({
  type: GET_ALL_SHOPPING_CART_ITEMS,
  payload: shopping_cart
})

const deleteItemFromShoppingCart = (shopping_cart: number) => ({
  type: DELETE_ITEM_FROM_SHOPPING_CART,
  payload: shopping_cart
})

/***************************
↓↓↓↓↓↓↓↓↓↓ THUNKS ↓↓↓↓↓↓↓↓↓↓
 **************************/

export const getAllShoppingCartItemsThunk = (): any => async (dispatch: any) => {
  try {
    const res = await fetch("/api/shopping_carts");
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllShoppingCartItems(data));

    }
  } catch (error) {
    return error;
  }
};
//keep as "number" because we're adding a product to shopping cart
export const addItemToShoppingCartThunk = (productId: number): any => async (dispatch: any) => {
  try {
    const res = await fetch("/api/shopping_carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId })
    });

    if (res.ok) {
      const data: IShoppingCartItem = await res.json();
      dispatch(addItemToShoppingCart(data));
    }
  } catch (error) {
    return error;
  }
};

export const deleteItemFromShoppingCartThunk = (itemId: number): any => async (dispatch: any) => {
  try {
    const res = await fetch(`/api/shopping_carts/${itemId}`, {
      method: "DELETE"
    });

    if (res.ok) {
      dispatch(deleteItemFromShoppingCart(itemId));
    }
  } catch (error) {
    return error;
  }
};


/**********************************
↓↓↓↓↓↓↓↓↓↓ INITIAL STATE ↓↓↓↓↓↓↓↓↓↓
 *********************************/

const initialState: IShoppingCartState = {
  byId: {},
  allShoppingCartItems: []
};


/****************************
↓↓↓↓↓↓↓↓↓↓ REDUCER ↓↓↓↓↓↓↓↓↓↓
 ***************************/

function shoppingCartReducer(state = initialState, action: IActionCreator) {

  let newState;
  switch (action.type) {

    case GET_ALL_SHOPPING_CART_ITEMS:
      // const shopping_items = action.payload.allShoppingCartItems;
      // newState = { ...state }
      // newState.allShoppingCartItems = shopping_items;
      // let newByIdItems: { [id: number]: IShoppingCart } = {};
      // for (let item of shopping_items) {
      //   newByIdItems[item.id] = item;
      // }
      // newState.byId = newByIdItems;
      // newState.allShoppingCartItems = shopping_items;

      // const shopping_items: IShoppingCart[] = action.payload;

      // newState = { ...state };
      // const newByIdItems: { [id: number]: IShoppingCart } = {};
      // for (let item of shopping_items) {
      //   newByIdItems[item.id] = item;
      // }

      // newState.byId = newByIdItems;
      // newState.allShoppingCartItems = shopping_items;

      // return newState;

      const shopping_items = action.payload;
      const newByIdItems: { [id: number]: IShoppingCartItem } = {};

      for (const item of shopping_items) {
        newByIdItems[item.id] = item;
      }

      return { ...state, byId: newByIdItems, allShoppingCartItems: shopping_items};
    case ADD_ITEM_TO_SHOPPING_CART:
      newState = { ...state };
      newState.allShoppingCartItems = [...newState.allShoppingCartItems, action.payload];
      newState.byId = { ...newState.byId, [action.payload.id]: action.payload };

      return newState;
    // return {
    //   ...state,
    //   byId: { ...state.byId, [action.payload.id]: action.payload },
    //   allShoppingCartItems: [...state.allShoppingCartItems, action.payload]
    // };

    case DELETE_ITEM_FROM_SHOPPING_CART:
      const newById = { ...state.byId };
      delete newById[action.payload];
      return { ...state, byId: newById, allShoppingCartItems: state.allShoppingCartItems.filter(item => item.id !== action.payload) };

    default:
      return state;
  }
}




export default shoppingCartReducer;