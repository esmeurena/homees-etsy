// import { IProductWithImages, IProductImage } from "./products";
import { IProduct } from "./products";

// export interface IShoppingCart {
//     id: number;
//     user_id: number;
//     product_id: number;
//     product_images: IProductImage[];
// }

export interface IShoppingCartItem {
    id: number;
    product_id: number;
    user_id: number;
    item_count:number;
    product?: IProduct;
    created_at?: string;
    updated_at?: string;
}

export interface IShoppingCartState {
    byId: {
        [id: number]: Item;
    };
    allShoppingCartItems: IShoppingCartItem[];
}

export interface IActionCreator {
    type: string;
    payload: any;
}