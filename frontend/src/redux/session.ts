import { IActionCreator} from "./types/redux";
import { ICredentials, ISignUpUser, IUser, SessionInitialState } from "./types/session";


const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user: IUser) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkAuthenticate = ():any => async (dispatch: any) => {
  try{

    const response = await fetch("/api/auth/");
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        throw response;
      }
      dispatch(setUser(data));
    } else {
      throw response;
    }
  }catch (e){
    const err = e as Response;
    return (await err.json());
  }

};

export const thunkLogin = (credentials: ICredentials):any => async (dispatch: any) => {
  try {

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return response;
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    const errorMessages = await err.json();
    return errorMessages;
  }

};

export const thunkSignup = (user: ISignUpUser):any => async (dispatch: any) => {
  try {

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    return (await err.json())
  }
};

export const thunkLogout = ():any => async (dispatch: any) => {
  try {
    await fetch("/api/auth/logout");
    dispatch(removeUser());
  } catch {
    return { server: "Something went wrong. Please try again" }
  }
};

const initialState:SessionInitialState = { user: null };

function sessionReducer(state = initialState, action: IActionCreator): SessionInitialState {
  let newState = {
    ...state
  };

  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
