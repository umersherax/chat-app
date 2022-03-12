import React, {useCallback, useState} from "react";
import useFrom from "../../custom-hooks/useForm";
import useApis from "../../custom-hooks/useApis";
import { Greeting } from "../Greeting";

var cnt = 0;

export default function Login() {
  var arr = ["umer","ali","hamza"];
  const [list,setList] = useState(arr);
  const [hdmovie, setHdmovie] = useState(true);

  const arx = useCallback(()=>{
    return list;
  },[list]);

  const handle = () => {
    setHdmovie(prev => !prev);
  }

  const handlePush = () => {
    console.log(cnt++)
    arr.push(cnt++);
    setList(arr);
  }


  const [values, handleInput] = useFrom();
  const [submit, error] = useApis(values);
  return (
    <div>
      <h1>Login</h1>
      <br />
      <form onSubmit={(e)=>submit({route:'login'}, e)}>
      <input
        type={"text"}
        placeholder="Emails"
        name="email"
        onChange={handleInput}
        value={values.email}

      />
      <br />
      <input
        type={"password"}
        placeholder="Password"
        name="password"
        onChange={handleInput}
        value={values.password}
      />


      <p className="text-danger">{error && "Form cannot be empty"}</p>
      <button onClick={(e)=>submit({route:'login'}, e)} className="btn btn-info">Login</button>
      


      
      </form>
    </div>
  );
}
