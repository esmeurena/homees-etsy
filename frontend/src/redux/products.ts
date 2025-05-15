// IMPORTS
import { IProduct, IProductState, IActionCreator } from './types/products';

//ACTION TYPES
const GET_ALL_PRODUCTS = 'products/GET_ALL_PRODUCTS';


// ACTION CREATORS

const getAllProducts = (products: IProduct[]) => ({
    type: GET_ALL_PRODUCTS,
    payload: products
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


// INITIAL STATE
const initialState: IProductState = {
    byId: {},
    allProducts: []
};


// REDUCER 
function productsReducer(state = initialState, action: IActionCreator) {
    let newState: IProductState = {
        byId: { ...state.byId },
        allProducts: [...state.allProducts]
    };

    switch (action.type) {
        case GET_ALL_PRODUCTS:
            const products = action.payload;
            newState.byId = {};
            newState.allProducts = [];

            for (let product of products) {
                newState.byId[product.id] = product;
            }

            newState.allProducts = products;

            return newState;
    
        default:
            return state;
    }
}




export default productsReducer;