

// ---- general types ----
export interface CSRFHttpOptions {
    method: string;
    headers: any;
    body?: string | FormData;
};

export interface IActionCreator {
    type: string;
    payload: IUser
}
