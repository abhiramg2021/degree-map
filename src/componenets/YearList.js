import React from "react";
import { Year } from "./Year";
import { useSelector } from "react-redux";

export const YearList = () => {
  const years = useSelector((state) => state.years);
  return (
    <div>
      {years.map((year) => (
        <Year
          yearId={year["yearId"]}
        />
      ))}
      {/* add year button with textbox for autofill suggestion */}
    </div>
  );
};
