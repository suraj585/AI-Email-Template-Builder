"use client";
import { useEmailTemplate, useScreenSize } from "@/app/provider";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Code, Monitor, Smartphone } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

function EditorHeader({ viewHTMLCode }) {
  // Correctly call the useScreenSize hook
  const { screenSize, setScreenSize } = useScreenSize();
  const updateEmailTemplate = useMutation(
    api.emailTemplate.UpdateTemplateDesign
  );
  const { templateId } = useParams();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const onSaveTemplate = async () => {
    await updateEmailTemplate({
      tid: templateId,
      design: emailTemplate,
    });
    toast("Email Template Saved Successfully!");
  };
  return (
    <div className="p-4 shadow-sm flex justify-between items-center">
      {/* Logo */}
      <Image src={"/logo.svg"} alt="logo" width={160} height={150} />

      {/* Screen size buttons */}
      <div className="flex gap-3">
        {/* Desktop Button */}
        <Button
          variant="ghost"
          className={
            screenSize === "desktop" ? "bg-purple-100 text-primary" : ""
          }
          onClick={() => setScreenSize("desktop")}
        >
          <Monitor /> Desktop
        </Button>

        {/* Mobile Button */}
        <Button
          variant="ghost"
          className={
            screenSize === "mobile" ? "bg-purple-100 text-primary" : ""
          }
          onClick={() => setScreenSize("mobile")}
        >
          <Smartphone /> Mobile
        </Button>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button
          variant="ghost"
          className="hover:text-primary hover:bg-purple-100"
          onClick={() => viewHTMLCode(true)}
        >
          <Code />
        </Button>
        <Button variant="outline">Send Test Email</Button>
        <Button onClick={onSaveTemplate}>Save Template</Button>
      </div>
    </div>
  );
}

export default EditorHeader;
