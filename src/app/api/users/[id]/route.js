import DBConnection from "@/app/utils/configure/db";
import UserModel from "@/app/utils/models/user";
import BookingModel from "@/app/utils/models/booking";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  await DBConnection();
  const id = context.params.id;
  console.log("dynamic_id", id);
  try {
    if (!id) {
      return NextResponse.json(
        { success: false, message: "no user found" },
        { status: 404 }
      );
    }
    const user = await UserModel.findById(id);
    console.log("dynamic_route_user", user);
    // const user = await UserModel.findById(id).populate("Booking");
    // console.log("dynamic_route_user", user); //No invoice data available
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "ID is missing" });
  }
}
