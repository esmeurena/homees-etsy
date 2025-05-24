import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { useRef } from 'react';
import "./SignupForm.css";



interface ISignUpErrors {
  server?: any;
  first_name?: string;
  last_name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}


function SignupFormModal() {
  const counter = useRef(1);

  const dispatch = useDispatch();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ISignUpErrors>({
    server: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name,
        last_name,
        address,
        city,
        state,
        country,
        username,
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const fillValues = () => {
    const count = counter.current;
    setFirstName("FirstNameTest" + count);
    setLastName("LastNameTest" + count);
    setAddress("1234 Test St Unit # " + count);
    setCity("New York");
    setState("New York");
    setCountry("United States");
    setUsername("usernameTest" + count);
    setEmail("testing" + count + "@aa.com");
    setPassword("password" + count);
    setConfirmPassword("password" + count);

    counter.current += 1;
  };

  return (
    <div id='sign-up-form'>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <div className='sign-up-form-input-containers'>
          <label>
            First Name
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className='sign-up-form-inputs'
              required
            />
          </label>
          {errors.first_name && <p>{errors.first_name}</p>}
          <label>
            Last Name
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              className='sign-up-form-inputs'
              required
            />
          </label>
        </div>
        {errors.last_name && <p>{errors.last_name}</p>}
        <div className='sign-up-form-input-containers'>
          <label>
            Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='sign-up-form-inputs'
              required
            />
          </label>
          {errors.address && <p>{errors.address}</p>}
          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='sign-up-form-inputs'
              required
            />
          </label>
        </div>
        {errors.city && <p>{errors.city}</p>}
        <div className='sign-up-form-input-containers'>
          <label>
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className='sign-up-form-inputs'
              required
            />
          </label>
          {errors.state && <p>{errors.state}</p>}
          <label>
            Country
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className='sign-up-form-inputs'
              required
            />
          </label>
        </div>
        {errors.country && <p>{errors.country}</p>}
        <div className='sign-up-form-input-containers'>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='sign-up-form-inputs'
              required
            />
          </label>
          {errors.username && <p>{errors.username}</p>}
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='sign-up-form-inputs'
              required
            />
          </label>
        </div>
        {errors.email && <p>{errors.email}</p>}
        <div className='sign-up-form-input-containers'>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='sign-up-form-inputs'
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='sign-up-form-inputs'
              required
            />
          </label>
        </div>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <div id='sign-up-form-buttons'>
          <button type="submit" id='sign-up-form-sign-up-button'>Sign Up</button>
          <button type="button" onClick={fillValues} id='sign-up-form-auto-fill-button'>AUTO-FILL</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
