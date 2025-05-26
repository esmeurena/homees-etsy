import { IProduct } from "./products";
export interface IFavorite {
    id: number;
    user_id: number;
    product_id: number;
    product?: IProduct;
    created_at?: string;
}

export interface IFavoriteState {
    byId: {
            [id: number]: Item;
        };
    allFavorites: IFavorite[];
}

export interface IActionCreator {
    type: string;
    payload?: any;
}
