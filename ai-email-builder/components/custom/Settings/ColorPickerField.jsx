import React from "react";

function ColorPickerField({ label, value, onHandleStyleChange }) {
  return (
    <div className="flex flex-col gap-2 h-20 w-15">
      <label>{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onHandleStyleChange(e.target.value)} // Call the callback with the new value
      />
    </div>
  );
}

export default ColorPickerField;
