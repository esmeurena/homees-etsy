export interface IFavorite {
    id: number;
    user_id: number;
    product_id: number;
    product?: any;
    created_at?: string;
}

export interface IFavoriteState {
    allFavorites: IFavorite[];
    byId: { [productId: number]: IFavorite };
}

export interface IActionCreator {
    type: string;
    payload?: any;
}
