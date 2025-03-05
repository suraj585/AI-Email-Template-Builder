"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Prompt from "@/Data/Prompt";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUserDetail } from "@/app/provider";
import { useRouter } from "next/navigation";

function AIInputBox() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState(null);
  const saveTemplate = useMutation(api.emailTemplate.SaveTemplate);
  const { userDetail } = useUserDetail();
  const router = useRouter();

  const OnGenerate = async () => {
    if (!userDetail?.email) {
      console.error("User email not available");
      return;
    }

    const PROMPT = Prompt.EMAIL_PROMPT + "\n-" + userInput;
    const tid = uuidv4();
    setLoading(true);
    setGeneratedTemplate(null);

    try {
      const result = await axios.post("/api/ai-email-generate", {
        prompt: PROMPT,
      });
      console.log("Generated Template:", result.data);
      setGeneratedTemplate(result.data);

      const resp = await saveTemplate(
        {
          tid: tid,
          design: result.data,
          email: userDetail.email,
        },
        { optimisticUpdate: false } // Disable optimistic updates
      );

      if (!resp) {
        throw new Error("Failed to save template");
      }

      console.log("Saved Template ID:", resp);
      router.push('/editor/' + tid);
    } catch (e) {
      const errorMessage = e?.response?.data?.error
        || e?.message
        || "Failed to generate or save template";

      console.error("Error Details:", errorMessage);
      setGeneratedTemplate({ error: errorMessage });
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
