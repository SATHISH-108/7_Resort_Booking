"use server";

import { signIn } from "../auth";
import DBConnection from "../utils/configure/db";
import { redirect } from "next/navigation";
const loginAction = async (loggedInUserDetails) => {
  // console.log("loggedInUserDetails", loggedInUserDetails);
  try {
    await DBConnection();
    let response = await signIn("credentials", {
      email: loggedInUserDetails.email,
      password: loggedInUserDetails.password,
      redirect: false,
    });
    console.log("login_action_response", response);
    return { success: true };
  } catch (error) {
    throw new Error("Invalid Credentials");
  }
};
export default loginAction;
