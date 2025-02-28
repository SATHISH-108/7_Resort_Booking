"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserNavigation from "@/app/components/UserNavigation";
import Link from "next/link";
import { CalendarComponent } from "@/app/components/index";
import bookingAction from "@/app/serveractions/bookingAction";
import { useRouter } from "next/navigation";
const page = () => {
  const [record, setRecord] = useState("");
  const [selectedDates, setSelectedDates] = useState(null);
  //   console.log(useParams());
  const { id } = useParams();
  const route = useRouter();
  const dynamicProductHandler = async () => {
    const response = await fetch(
      `http://localhost:3000/api/admin/product/${id}`
    );
    const newData = await response.json();
    setRecord(newData.data);
    // console.log("record", record);
  };
  useEffect(() => {
    dynamicProductHandler();
  }, []);
  const bookingHandler = async () => {
    // console.log("booking details", record);
    //     {_id: '67b88a3a8883db74cdf8c1df', title: 'luxury room', description: 'jhcjkmkskld', price: 4000, offer: '10', …}
    // amenitie : Array(7) 0 : "Ac" 1 :"Greyser" 2 : "Tv" 3 : "Wi-Fi" 4: "Elevator" 5 : "Break-fast" 6 : "swimming pool" length: 7
    // description :"jhcjkmkskld" ,image : "/uploads/1_suite-hotels.jpg" , offer :"10", price : 4000 , title :"luxury room",
    // _id: "67b88a3a8883db74cdf8c1df"
    if (!selectedDates) {
      alert("Please select booking dates");
      return;
      //return means excuition will be stop here.
    }
    const bookingDetails = { record, selectedDates };
    try {
      // await bookingAction(record);
      const response = await bookingAction(bookingDetails);
      if (response.success) {
        alert("Booking Successfull");
        route.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
    console.log("dates coming from calenderComponent ", dates);
  };
  return (
    <div>
      <UserNavigation />
      <CalendarComponent onDateSelect={handleDateSelect} />
      <Link href="/">
        <p align="center">Go Back</p>
      </Link>
      {record ? (
        <div className="">
          <div className="singleSection">
            <div className="singleLeft">
              <div className="">
                <h2>{record.title}</h2>
              </div>
              <img
                src={record.image}
                alt={record.title}
                className="singleImage"
              />
            </div>
            <div className="singleCenter">
              <div className="singlePrice">Rs.{record.price}</div>
              <p className="singleDesc">{record.description}</p>
              <div className="">
                {record.amenitie.map((item, i) => {
                  return (
                    <div className="singleAmen" key={i}>
                      <span>*</span> {item}
                    </div>
                  );
                })}
              </div>
              <div className="offer">
                <span>*</span>
                <button> Discount {record.offer}</button>
              </div>
              <div className="singleBtn">
                <button className="" onClick={bookingHandler}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ position: "absolute", top: "50%", left: "50%" }}>
          Loading..
        </h1>
      )}
    </div>
  );
};

export default page;
