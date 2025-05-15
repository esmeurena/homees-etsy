// ------- Imports -------
import { Dispatch } from 'redux';

// ------- Types -------
export interface Product {
    id: number;
    ownerId: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

interface ProductState {
    byId: { [id: number]: Product };
}

// ------- Action Types -------
const PRODUCT_DETAILS = "products/productDetails" as const;

// ------- Action Creator -------
const setProduct = (product: Product) => ({
    type: PRODUCT_DETAILS,
    payload: product,
});

// ------- Union Type for Actions -------
type ProductAction = ReturnType<typeof setProduct>;

// ------- Thunk -------
export const getOneProductThunk = (productId: string) => async (dispatch: Dispatch<ProductAction>) => {
    try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
            const data: Product = await response.json();
            dispatch(setProduct(data));
            return data;
        } else {
            throw response;
        }
    } catch (error) {
        return error;
    }
};

// ------- Initial State -------
const initialState: ProductState = {
    byId: {},
};

// ------- Reducer -------
const productsReducer = (state = initialState, action: ProductAction): ProductState => {
    switch (action.type) {
        case PRODUCT_DETAILS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: action.payload,
                },
            };
        default:
            return state;
    }
};

export default productsReducer;
