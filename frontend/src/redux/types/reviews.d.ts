export interface IReview {
    id: number;
    user_id: number;
    product_id: number;
    review: string;
    stars: number;
    created_at: string;
    updated_at: string;
    user?: {
        id: number;
        username: string;
    }
}

export interface IReviewImage {
    id: number;
    review_id: number;
    url: string;
    created_at: string;
    updated_at: string;
}

export interface ICreateReview {
    product_id: number;
    review: string;
    stars: number;

}

export interface IReviewState {
    byId: {
        [id: number]: IReview;
    };
    allReviews: IReview[];
}
export interface IActionCreator {
    type: string;
    payload: any;
}