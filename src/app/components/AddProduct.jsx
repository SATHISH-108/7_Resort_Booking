"use client";

import React, { useState } from "react";
import admin from "./components.module.css";
const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    offer: "",
    amenitie: "",
    description: "",
    image: "",
  });
  const recordHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // console.log("addProduct_data", data);
    data.append("title", product.title);
    data.append("price", product.price);
    data.append("offer", product.offer);
    data.append("description", product.description);
    data.append("amenitie", product.amenitie);
    data.append("image", product.image);
    // console.log("addProduct_data", data);
    try {
      const response = await fetch(
        `https://nextjs-resort-booking.vercel.app/api/admin/add-product`,
        {
          method: "POST",
          body: data,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      if (result.success) {
        alert("Record Added Successfully");
        setProduct({
          ...product,
          title: "",
          price: "",
          offer: "",
          amenitie: "",
          description: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("Error in recordHandler:", error);
      alert("Failed to add record, try again");
    }
  };
  return (
    <div className={admin.container}>
      <h1>Add Record</h1>
      <form onSubmit={recordHandler} encType="multipart/form-data">
        <div className={admin.fields}>
          <div className="">
            <h3>Title</h3>
            <input
              type="text"
              value={product.title}
              placeholder="ENTER TITLE"
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </div>
          <div>
            <h3>Price</h3>
            <input
              type="number"
              value={product.price}
              placeholder="ENTER PRICE"
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </div>
        </div>
        <div className={admin.fields}>
          <div className="">
            <h3>Offer</h3>
            <input
              type="number"
              value={product.offer}
              placeholder="ENTER OFFER"
              onChange={(e) =>
                setProduct({ ...product, offer: e.target.value })
              }
            />
          </div>
          <div className="">
            <h3>Amenities</h3>
            <input
              type="text"
              value={product.amenitie}
              placeholder="ENTER AMENITIE"
              onChange={(e) =>
                setProduct({ ...product, amenitie: e.target.value })
              }
            />
          </div>
        </div>
        <div className={admin.textField}>
          <h3>Description</h3>
          <textarea
            type="text"
            rows="5"
            value={product.description}
            placeholder="ENTER DESCRIPTION"
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </div>
        <div className={admin.textField}>
          <h3>Upload Image</h3>
          <input
            type="file"
            accept="image/*"
            placeholder="UPLOAD IMAGE"
            onChange={(e) =>
              setProduct({ ...product, image: e.target.files[0] })
            }
            // onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className={admin.submit}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
