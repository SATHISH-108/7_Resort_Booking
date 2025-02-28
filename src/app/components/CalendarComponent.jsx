"use client";
import { DateRange } from "react-date-range";
import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const CalendarComponent = ({ onDateSelect }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      //   endDate: null,
      endDate: new Date(), // you can get current date if you use new Date()
      key: "selection",
    },
  ]);
  const [selectedDates, setSelectedDates] = useState(null);
  const handleSelectDates = async () => {
    const startDate = date[0].startDate.toLocaleDateString();
    const endDate = date[0].endDate.toLocaleDateString();
    setSelectedDates(`Selected Dates : ${startDate} - ${endDate}`);
    setShowCalendar(false);
    const bookingDates = { startDate, endDate };
    console.log("selectedDates from calendar: ", bookingDates);
    if (onDateSelect) {
      onDateSelect(bookingDates);
    }
  };
  const currentDate = new Date().toDateString();
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  const formattedDate = nextDate.toDateString();
  //follow below example:-
  //   const d = new Date(0);
  // console.log(d.toString()); // "Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time)"
  // console.log(d.toDateString()); // "Thu Jan 01 1970"
  return (
    <div className="calenderSection">
      <div
        className="currentDate"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {!selectedDates && <>{`${currentDate} - ${formattedDate}`}</>}

        {selectedDates && (
          <div className="" style={{ color: "red" }}>
            {selectedDates}
          </div>
        )}
      </div>
      {/* <button onClick={() => setShowCalendar(!showCalendar) }> Show Calendar</button>  */}
      {showCalendar && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          className="dateRange"
        />
      )}
      <button className="calenderButton" onClick={handleSelectDates}>
        Select Dates
      </button>
    </div>
  );
};

export default CalendarComponent;
