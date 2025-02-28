"use server";

import DBConnection from "../utils/configure/db";
import UserModel from "../utils/models/user";

const registerAction = async (registeredUserDetails) => {
  // console.log("registeredUserDetails", registeredUserDetails);
  try {
    await DBConnection();
    // await UserModel.create(registeredUserDetails);
    //or
    await UserModel.create({
      username: registeredUserDetails.username,
      email: registeredUserDetails.email,
      password: registeredUserDetails.password,
      // role: registeredUserDetails.role || "user",
      // bookings: registeredUserDetails.bookings || [],
    });
    return { success: true };
  } catch (error) {
    throw new Error("please privide all inputs*");
  }
};
export default registerAction;
