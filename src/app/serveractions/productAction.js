"use server";

import DBConnection from "../utils/configure/db";
import ProductModel from "../utils/models/product";

const productAction = async (productDetails) => {
  await DBConnection();
  // console.log("productDetails", productDetails);
  //   await ProductModel.create(productDetails);
};
export default productAction;
