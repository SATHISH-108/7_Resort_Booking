"use client";
import { useState } from "react";
import registerAction from "@/app/serveractions/registerAction";
import { useRouter } from "next/navigation";
import Link from "next/link";
const RegisterForm = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await registerAction(user);
      if (response.success) {
        setUser({ ...user, username: "", email: "", password: "" });
        alert("User Registered successfully");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="formContainer">
      <h1>Register Form</h1>
      <form onSubmit={registerHandler} className="formSection">
        <p
          style={{
            color: "red",
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          {error}
        </p>
        <h3>Username</h3>
        <input
          type="text"
          // name="username"
          placeholder="ENTER USERNAME"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <h3>Email</h3>
        <input
          type="email"
          // name="email"
          placeholder="ENTER EMAIL"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <h3>Password</h3>
        <input
          type="password"
          // name="password"
          placeholder="ENTER PASSWORD"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
      <Link href="/login" className="link">
        Already Registered? Login
      </Link>
    </div>
  );
};
export default RegisterForm;
