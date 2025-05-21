import { IUser } from "./session";

export interface IReview {
    id: number;
    product_id: number;
    review: string;
    stars: number;
    review_images: IReviewImage[];
    user: IUser;
    created_at: string;
    updated_at: string;
}

export interface IReviewImage {
    id: number;
    preview: boolean;
    product_id: number;
    url: string;
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

export interface IReviewCard {
    review: IReview;
}