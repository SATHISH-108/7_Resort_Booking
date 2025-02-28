import DBConnection from "@/app/utils/configure/db";
import ProductModel from "@/app/utils/models/product";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  await DBConnection();
  //   console.log("params", params);
  const id = context.params.id;
  console.log("dynamic_id", id);
  try {
    if (!id) {
      return NextResponse.json(
        { success: false, message: "no product found" },
        { status: 404 }
      );
    }
    const product = await ProductModel.findById(id);
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "ID is missing" });
  }
}
