
import { IUser } from "./session";

export interface IReview {
    id: number;
    product_id: number;
    user_id: number;
    review: string;
    stars: number;
    review_images: IReviewImage[];
    user: IUser;
    created_at: string;
    updated_at: string;
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

export interface IAllReviews {
    reviews: IReview[];
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
export interface IReviewCard {
    review: IReview;
}