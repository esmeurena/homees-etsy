export interface IProduct {
    id: number;
    user_id: number;
    name: string;
    description: string;
    price: number;
    item_count: number;
    created_at: string;
    updated_at: string;
}

export interface ICreateProduct {
    name: string;
    description: string;
    price: number;
    item_count: number;

    product_images: string[];
    // product_images:{
    //     id: number;
    //     image_url: string
    // }[];
}

export interface IDeleteProduct {
    id: number;
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
