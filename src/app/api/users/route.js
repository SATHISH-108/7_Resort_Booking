import DBConnection from "@/app/utils/configure/db";
import UserModel from "@/app/utils/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await DBConnection();
  try {
    // let users = await UserModel.find({});
    // // get user records with role(admin) and password basically it is confidential so need to hide it.
    let users = await UserModel.find(
      { role: { $ne: "admin" } },
      { password: 0 }
    );
    if (!users) {
      return NextResponse.json(
        { success: false, message: "no users" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "failed to get users" },
      { status: 500 }
    );
  }
}
