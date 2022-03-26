import React, { useEffect } from "react";
import useFrom from "../../custom-hooks/useForm";
import useApis from "../../custom-hooks/useApis";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
export default function Login() {

  const redirect = useNavigate();

  useEffect(()=>{

    if(localStorage.getItem("userId")){
      redirect('/dashboard');
    }

  },[])

  const [values, handleInput] = useFrom();
  const [submit, error] = useApis(values);
  return (
    <div className="container mt-5">
      <h1>Chat app</h1>
      <br />
      <h3>Login</h3>
      <br />

      <form onSubmit={(e) => submit({ route: "login" }, e)}>
        <div className="form-group col-md-4">
          <label htmlFor="inputEmail4">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            onChange={handleInput}
            value={values.email}
          />
        </div>
        <div className="form-group col-md-4 mt-4">
          <label htmlFor="inputPassword4">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={handleInput}
            value={values.password}
          />
        </div>
        <p className="text-danger">{error && "Form cannot be empty"}</p>

        <Button
          onClick={(e) => submit({ route: "login" }, e)}
          className="btn btn-primary btn-small"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
