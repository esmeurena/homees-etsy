import React, { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { AnyAction } from "redux";


interface IErrors {
  email: string;
  password: string
}

function LoginFormModal(): JSX.Element {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IErrors | AnyAction>({ email: "", password: "" });
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );
    
    if (serverResponse.ok) {
      closeModal();
    } else {
      setErrors(serverResponse);
    }
  };
  const handleDemoLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({
        email: "user1@aa.io",
        password: "password"
      })
    );
    if (serverResponse.ok) {
      closeModal();
    } else {
      setErrors(serverResponse)
    }
  }
  return (
    <div id='login-form'>
      <h1>Log In</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className='login-form-input-containers'>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='login-form-inputs'
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className='login-form-input-containers'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='login-form-inputs'
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <div id='login-form-buttons'>
          <button type="submit" id='login-form-login-button'>Log In</button>
          <button type="button" onClick={handleDemoLogin} id='login-form-demo-login-button'>
            Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
