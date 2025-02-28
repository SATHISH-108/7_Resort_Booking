"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
const ProductCollection = () => {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const collectionHandler = async () => {
    try {
      let response = await fetch(
        "https://nextjs-resort-booking.vercel.app/api/admin/add-product"
      );
      const newData = await response.json();
      // console.log("newData", newData);
      setLoading(false);
      setCollections(newData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    collectionHandler();
  }, []);
  return (
    <div className="productSection">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <h3>Loading...</h3>
        </div>
      ) : (
        <>
          <h1 align="center">Select your Stay</h1>
          {collections.map((item) => {
            return (
              <div key={item._id} className="proDetail">
                <div className="left">
                  <div className="title">{item.title}</div>
                  <br />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="roomImage"
                  />
                </div>
                <div className="center">
                  <div className="pamen">
                    <h2 className="price">Rs. {item.price}</h2>
                    <div>
                      <h3>Amenities</h3>
                      {item.amenitie.map((serve, i) => {
                        return (
                          <div className="amenities" key={i}>
                            <div>*{serve}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="right">
                    <Link href={`/detail/${item._id}`}>
                      <button className="detail">Details </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ProductCollection;
