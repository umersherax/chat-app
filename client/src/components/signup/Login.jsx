import React, { useCallback, useState } from "react";
import useFrom from "../../custom-hooks/useForm";
import useApis from "../../custom-hooks/useApis";
import { Greeting } from "../Greeting";

var cnt = 0;

export default function Login() {
  var arr = ["umer", "ali", "hamza"];
  const [list, setList] = useState(arr);
  const [hdmovie, setHdmovie] = useState(true);

  const arx = useCallback(() => {
    return list;
  }, [list]);

  const handle = () => {
    setHdmovie((prev) => !prev);
  };

  const handlePush = () => {
    console.log(cnt++);
    arr.push(cnt++);
    setList(arr);
  };

  const [values, handleInput] = useFrom();
  const [submit, error] = useApis(values);
  return (
    <div className="container mt-5">
      <h1>Chat app</h1>
      <br />
      <h3>Login</h3>
      <br />

      <form onSubmit={(e) => submit({ route: "login" }, e)}>
        <div class="form-group col-md-4">
          <label for="inputEmail4">Email</label>
          <input
            type="email"
            name="email"
            class="form-control"
            placeholder="Email"
            onChange={handleInput}
            value={values.email}
          />
        </div>
        <div class="form-group col-md-4 mt-4">
          <label for="inputPassword4">Password</label>
          <input
            type="password"
            name="password"
            class="form-control"
            placeholder="Password"
            onChange={handleInput}
            value={values.password}
          />
        </div>
        <p className="text-danger">{error && "Form cannot be empty"}</p>

        <button
          onClick={(e) => submit({ route: "login" }, e)}
          className="btn btn-primary btn-small"
        >
          Login
        </button>
      </form>
    </div>
  );
}
