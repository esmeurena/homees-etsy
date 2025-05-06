
## Redux

- thunks

Example:


```ts
export const addSpotThunk = (newSpotForm: ISpot):any => async (dispatch: any) => {
  try{
    // We still use REGULAR fetch, because python not typescript
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
    // Notice we have to declare the type of the error
    const err = e as Response;
    return (await err.json());
  }

};

```


- Action Creations


```ts

// Largly unchanged, just declare the shape of the data we will be sending

const setUser = (user: IUser) => ({
  type: SET_USER,
  payload: user
});



```


- We will use `useAppSelector` to grab from `state`, because this will tell us the types

Example:

```ts
// imports ^

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Notice thhe useAppSelector
  const sessionUser = useAppSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ISignUpErrors>({
    server: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

}
```

- Reducer


```ts


// put the interface in another file though

interface ISpotState {
    // This means we will have to have an object of id: spot objects
    byId: {
        [id:number|string]: Spot;
    },

    // This means we will have to have an array of objects that look like a Spot
    allSpots: Spot[]

}

// Normalize our state, and state shape
const initialState: ISpotState = {
    byId: {},
    allSpots: []
};

// Notice we have a type for an action creator (type , payload)
function spotReducer(state = initialState, action: IActionCreator) {

    // Update the values in the switch cases
    let newState: ISpotState = {
        // spreads the old stuff
    byId: {...state.byId},
    // spreads the old stuff
    allSpots: [...state.allSpots]
};

    // variable for us to use int he switch cases
    let newById: ISpotById ;
    // variable for us to use in the switch cases
    let newAllSpots: ISpot[] = [];
  switch (action.type) {
    case SET_SPOT:
        const newSpot = action.payload;
        const newSpotId = newSpot.id;
        //add the new spot to the object
        newState.byId[newSpotId] = newSpot;
        // Adds the new spot to the bottom of the list
        newState.allSpots = [...newState.allSpots, newSpot]
        return newState;

    default:
      return state;
  }
}

```



- In our `store.ts` file, add your reducers to the file to get type checks

Example:

```ts
const rootReducer = combineReducers({
  session: sessionReducer,
  // Add new reducers here
});


```


- Add any new `Interface`s or `Type`s into the `redux/types` folder. You can use the existing `.d.ts` files, or you can make a new one. I recommend a new one per `redux` file.

Example:

```ts
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


```


## React files

- Adding Types to a use state

```ts

interface ISpotForm {
    address: string;
    city: string;
    zip: number | null;
    images: string[];

}


const SplashPage = () => {

    // Makes a form object for state, and adds a default matching our interface
    const [spotForm, setSpotForm] = useState<ISportform>({
        address: "";
        city: "";
        zip: null;
        images: [];
    })

}

```


- Making a custom function:

Example:
```ts

// ....

    // Notice the type of the event here is a form, because we submit a form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        credential: email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };
// ....
  <>
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message:string) => <p key={message}>{message}</p>)}
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
  );

```
