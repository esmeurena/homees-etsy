
export interface SessionInitialState {
    user: null | IUser;
}

export interface IUser {
    last_name: string;
    first_name: string;
    username: string;
    id: number;
    email: string;
}

export interface ISignUpUser{
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    email: string;
    username: string;
    password: string;
}


export interface ICredentials {
    credential?: string;
    email?: string;
    password: string;

}
