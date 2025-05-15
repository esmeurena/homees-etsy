export interface IProduct {
    id: number;
    owner_id: number;
    name: string;
    description: string;
    price: number;
    item_count: number;
    created_at: string;
    updated_at: string;

}

export interface IProductImage {
    id: number;
    product_id: number;
    url: string;
    preview: boolean;
    created_at: string;
    updated_at: string;
}

export interface IProductState {
    byId: {
        [id: number]: Iproduct;
    };
    allProducts: Iproduct[];
}

export interface IActionCreator {
    type: string;
    payload: any;
}