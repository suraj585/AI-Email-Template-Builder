"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function AIInputBox() {
  const [userInput, setUserInput] = useState(""); // Default to empty string
  const [loading, setLoading] = useState(false);

  return (
    <div className="mt-5">
      <p className="mb-2">
        Provide details about the email template you'd like to create?
      </p>
      <Textarea
        placeholder="Start writing here"
        rows="5"
        className="text-xl"
        value={userInput} // Bind state to textarea
        onChange={(e) => setUserInput(e.target.value)} // Update state on change
      />
      <Button
        className="mt-7 w-full"
        disabled={!userInput.trim() || loading} // Disable if empty or loading
      >
        GENERATE
      </Button>
    </div>
  );
}

export default AIInputBox;
