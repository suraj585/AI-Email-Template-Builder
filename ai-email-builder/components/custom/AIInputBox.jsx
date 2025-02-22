"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Prompt from "@/Data/Prompt";
import axios from "axios";

function AIInputBox() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState(null);

  const OnGenerate = async () => {
    const PROMPT = Prompt.EMAIL_PROMPT + "\n-" + userInput;
    setLoading(true);
    setGeneratedTemplate(null);

    try {
      const result = await axios.post("/api/ai-email-generate", {
        prompt: PROMPT,
      });
      console.log("Generated Template:", result.data);
      setGeneratedTemplate(result.data); // Store the result
    } catch (e) {
      console.error("Error Details:", e.response ? e.response.data : e.message);
      setGeneratedTemplate({
        error: e.response?.data?.error || "Failed to generate template",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <p className="mb-2">
        Provide details about the email template you'd like to create?
      </p>
      <Textarea
        placeholder="Start writing here"
        rows="5"
        className="text-xl"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button
        className="mt-7 w-full"
        disabled={!userInput.trim() || loading}
        onClick={OnGenerate}
      >
        {loading ? "Generating..." : "GENERATE"}
      </Button>
      {generatedTemplate && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
          {generatedTemplate.error ? (
            <p className="text-red-500">{generatedTemplate.error}</p>
          ) : (
            <p className="text-green-500">Template generated successfully!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AIInputBox;
