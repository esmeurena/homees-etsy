// IMPORTS
import { IProduct, IProductState, IActionCreator } from './types/products';

//ACTION TYPES
const GET_ALL_PRODUCTS = 'products/GET_ALL_PRODUCTS';
const GET_SINGLE_PRODUCT = 'products/GET_SINGLE_PRODUCT';

// ACTION CREATORS

const getAllProducts = (products: IProduct[]) => ({
    type: GET_ALL_PRODUCTS,
    payload: products
})

const getSingleProduct = (product: IProduct[]) => ({
    type: GET_SINGLE_PRODUCT,
    payload: product
})

// THUNK
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

export const getSingleProductThunk = (productId: number) => async (dispatch: any) => {
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



// INITIAL STATE
const initialState: IProductState = {
    byId: {},
    allProducts: []
};


// REDUCER
function productsReducer(state = initialState, action: IActionCreator) {
    // let newState: IProductState = {
    //     byId: { ...state.byId },
    //     allProducts: [...state.allProducts]
    // };
    let newState;
    switch (action.type) {
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
            const singleProduct = action.payload;
            newState = { ...state };
            newState.allProducts = singleProduct;
            let newByIdGetSingleProduct: { [id: number]: IProduct } = {};
            for (let product of [singleProduct]) {
                newByIdGetSingleProduct[product.id] = product;
            }
            newState.byId = newByIdGetSingleProduct;
            return newState;



        default:
            return state;
    }
}




export default productsReducer;