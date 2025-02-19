import { Slider } from "@/components/ui/slider";
import React from "react";

function SliderField({ label, value, onHandleStyleChange, type = "%" }) {
  // Format the value by removing the unit (e.g., "%", "px")
  const FormattedValue = (value_) => {
    return typeof value_ === "string"
      ? Number(value_.replace(type, "")) || 0 // Default to 0 if parsing fails
      : value_;
  };

  return (
    <div>
      <label>
        {label} ({value})
      </label>
      <Slider
        defaultValue={[FormattedValue(value)]} // Use the numeric part only
        max={100}
        step={1}
        onValueChange={(v) => {
          const newValue = `${v[0]}${type}`; // Append the unit dynamically
          console.log("New Value:", newValue); // Debugging log
          onHandleStyleChange(newValue);
        }}
      />
    </div>
  );
}

export default SliderField;
