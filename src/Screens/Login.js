import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [userDto, setUserDto] = useState({
    name: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserDto({ ...userDto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userDto.name,

        password: userDto.password,
      }),
    });
    const json = await response.json();
    console.log("response", json);

    if (!json.success) {
      alert("enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="name"
              value={userDto?.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={userDto?.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/signUp" className="m-3 btn btn-danger">
            I am a new user
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
