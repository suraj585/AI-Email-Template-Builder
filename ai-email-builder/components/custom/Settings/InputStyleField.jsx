import { Input } from "@/components/ui/input";
import React from "react";

function InputStyleField({ label, value, onHandleStyleChange, type = "px" }) {
  // Format the value by removing the unit (e.g., "px", "em", etc.)
  const FormattedValue = (value_) => {
    if (!value_) return 16; // Default to 16 if value is undefined, null, or empty
    return typeof value_ === "string"
      ? Number(value_.replace(type, "")) || 16 // Default to 16 if parsing fails
      : value_;
  };

  return (
    <div>
      <label>{label}</label>
      <div className="flex">
        <Input
          type="text"
          value={FormattedValue(value)} // Display the numeric part only
          onChange={(e) => {
            const newValue = e.target.value.trim(); // Trim whitespace
            let parsedValue;

            if (newValue === "") {
              // Handle empty input: Use a default value with the specified unit
              parsedValue = `16${type}`;
            } else if (!isNaN(newValue)) {
              // Valid numeric input: Append the specified unit
              parsedValue = `${newValue}${type}`;
            } else {
              // Invalid input: Use the current value to avoid breaking the UI
              parsedValue = value || `16${type}`;
            }

            console.log("Parsed Value:", parsedValue); // Debugging log
            onHandleStyleChange(parsedValue);
          }}
        />
        <h2 className="p-1 bg-gray-100 rounded-r-lg -ml-2">{type}</h2>{" "}
        {/* Show the unit dynamically */}
      </div>
    </div>
  );
}

export default InputStyleField;
