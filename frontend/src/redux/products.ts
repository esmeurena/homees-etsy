/****************************
↓↓↓↓↓↓↓↓↓↓ IMPORTS ↓↓↓↓↓↓↓↓↓↓
 ***************************/

import { IProduct, IProductState, IActionCreator, ICreateProduct } from './types/products';

/*********************************
↓↓↓↓↓↓↓↓↓↓ ACTION TYPES ↓↓↓↓↓↓↓↓↓↓
 ********************************/

const CREATE_A_PRODUCT = 'products/createProduct'
const GET_ALL_PRODUCTS = 'products/GET_ALL_PRODUCTS';
const GET_SINGLE_PRODUCT = 'products/GET_SINGLE_PRODUCT';
const UPDATE_A_PRODUCT = 'products/UPDATE_A_PRODUCT';
const DELETE_A_PRODUCT = 'products/DELETE_A_PRODUCT';

/************************************
↓↓↓↓↓↓↓↓↓↓ ACTION CREATORS ↓↓↓↓↓↓↓↓↓↓
 ***********************************/

const createProduct = (product: IProduct) => ({
  type: CREATE_A_PRODUCT,
  payload: product
});

const getAllProducts = (products: IProduct[]) => ({
    type: GET_ALL_PRODUCTS,
    payload: products
})

const getSingleProduct = (product: IProduct) => ({
    type: GET_SINGLE_PRODUCT,
    payload: product
})

const updateAProduct = (product: IProduct) => ({
    type: UPDATE_A_PRODUCT,
    payload: product
})

const deleteAProduct = (productId: number) => ({
  type: DELETE_A_PRODUCT,
  payload: productId
});

/***************************
↓↓↓↓↓↓↓↓↓↓ THUNKS ↓↓↓↓↓↓↓↓↓↓
 **************************/

export const createProductThunk = (product: ICreateProduct):any => async (dispatch: any) => {
  try {

    const response = await fetch("/api/products/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });

    if (response.ok) {
    //   const data = await response.json();
    const data : IProduct = await response.json();
      dispatch(createProduct(data));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    return (await err.json())
  }
};

export const getAllProductsThunk = (): any => async (dispatch: any) => {
    try {
        const res = await fetch('/api/products');
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw res;
            }
            dispatch(getAllProducts(data))
            return data.Products;
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return (await err.json());
    }
}

export const getSingleProductThunk = (productId: number): any => async (dispatch: any) => {
    try {
        const res = await fetch(`/api/products/${productId}`);
        if (res.ok) {
            const data = await res.json();
            dispatch(getSingleProduct(data));
            return data;
        } else {
            throw res;
        }
    } catch (error) {
        return error;
    }
};

export const updateAProductThunk = (productId: number, product: ICreateProduct):any => async (dispatch: any) => {
  try {

    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });

    if (response.ok) {
    //   const data = await response.json();
    const data : IProduct = await response.json();
      dispatch(updateAProduct(data));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    return (await err.json())
  }
};


export const deleteAProductThunk = (productId: number): any => async (dispatch: any) => {
  try {
    const res = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(deleteAProduct(productId));
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

const initialState: IProductState = {
    byId: {},
    allProducts: []
};


/****************************
↓↓↓↓↓↓↓↓↓↓ REDUCER ↓↓↓↓↓↓↓↓↓↓
 ***************************/

function productsReducer(state = initialState, action: IActionCreator) {
    // let newState: IProductState = {
    //     byId: { ...state.byId },
    //     allProducts: [...state.allProducts]
    // };
    let newState;
    switch (action.type) {

        case CREATE_A_PRODUCT:
            newState = { ...state };
            newState.allProducts = [...newState.allProducts, action.payload];
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload };

            return newState;

        case GET_ALL_PRODUCTS:
            const products = action.payload.Products;
            newState = { ...state }
            newState.allProducts = products;
            let newByIdGetAllProducts: { [id: number]: IProduct} = {};
            for (let product of products) {
                newByIdGetAllProducts[product.id] = product;
            }
            newState.byId = newByIdGetAllProducts;
            newState.allProducts = products;
            return newState;

        case GET_SINGLE_PRODUCT:
            // const singleProduct = [action.payload];
            // newState.allProducts = singleProduct;
            // let newByIdGetSingleProduct: { [id: number]: IProduct } = {};
            // for (let product of [singleProduct]) {
            //     newByIdGetSingleProduct[product.id] = product;
            // }
            // newState.byId = newByIdGetSingleProduct;
            newState = { ...state };
            newState.allProducts = [action.payload];

            newState.byId[action.payload.id] = action.payload;
            return newState;

        case UPDATE_A_PRODUCT:
            newState = { ...state };
            newState.allProducts = [...newState.allProducts, action.payload];
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload };

            return newState;

        case DELETE_A_PRODUCT:
          newState = { ...state };
          newState.allProducts = state.allProducts.filter( (product) => product.id !== action.payload);
          newState.byId = { ...state.byId };
          delete newState.byId[action.payload];
          return newState;

        default:
            return state;
    }
}




export default productsReducer;
