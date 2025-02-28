"use client";
import { useState } from "react";
import loginAction from "@/app/serveractions/loginAction";
import { useRouter } from "next/navigation";
import Link from "next/link";
const LoginForm = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      let response = await loginAction(user);
      if (response.success) {
        setUser({ ...user, email: "", password: "" });
        alert("User logged in successfully");
        router.push("/");
      } else {
        setError(response.message || "login failed");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="formContainer">
      {loading && <h3>Loading...</h3>}
      <h1>Login Form</h1>
      <form onSubmit={loginHandler} className="formSection">
        {error && (
          <p
            style={{
              color: "red",
              fontSize: "20px",
              marginBottom: "10px",
            }}
          >
            {error}
          </p>
        )}
        <h3>Email</h3>
        <input
          type="email"
          //   name="email"
          placeholder="ENTER EMAIL"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <h3>Password</h3>
        <input
          type="password"
          //   name="password"
          placeholder="ENTER PASSWORD"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <Link href="/register" className="link">
        If not registered? Register
      </Link>
    </div>
  );
};
export default LoginForm;
