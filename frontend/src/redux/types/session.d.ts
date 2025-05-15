
export interface SessionInitialState {
    user: null | IUser;
}

export interface IUser {
    lastName: string;
    firstName: string;
    username: string;
    id: number;
    email: string;
}

export interface ISignUpUser{
    email: string;
    username: string;
    password: string;
}


export interface ICredentials {
    credential?: string;
    email?: string;
    password: string;

}
