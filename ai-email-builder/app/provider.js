"use client";
import { DragDropLayoutElement } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import { SelectedElementContext } from "@/context/SelectedElementContext";
import { UserDetailcontext } from "@/context/UserDetaikContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useContext, useEffect, useState } from "react";

function Provider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  // State initialization
  const [userDetail, setUserDetail] = useState(null);
  const [screenSize, setScreenSize] = useState("desktop");
  const [dragElementLayout, setDragElementLayout] = useState(null);
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedElement, setSelectedElement] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safely parse userDetail from localStorage
      const userDetailStorage = localStorage.getItem("userDetail");
      if (userDetailStorage) {
        try {
          const parsedUserDetail = JSON.parse(userDetailStorage);
          if (!parsedUserDetail?.email || !parsedUserDetail) {
            console.log("No valid user detail found in localStorage");
          } else {
            setUserDetail(parsedUserDetail);
          }
        } catch (error) {
          console.error("Failed to parse userDetail from localStorage:", error);
        }
      } else {
        console.log("No userDetail found in localStorage");
      }

      // Safely parse emailTemplate from localStorage
      const emailTemplateStorage = localStorage.getItem("emailTemplate");
      if (emailTemplateStorage) {
        try {
          const parsedEmailTemplate = JSON.parse(emailTemplateStorage);
          setEmailTemplate(parsedEmailTemplate ?? []);
        } catch (error) {
          console.error(
            "Failed to parse emailTemplate from localStorage:",
            error
          );
          setEmailTemplate([]); // Fallback to an empty array
        }
      } else {
        setEmailTemplate([]); // Fallback to an empty array
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate]);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserDetailcontext.Provider value={{ userDetail, setUserDetail }}>
          <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
            <DragDropLayoutElement.Provider
              value={{ dragElementLayout, setDragElementLayout }}>
              <EmailTemplateContext.Provider
                value={{ emailTemplate, setEmailTemplate }}>
                <SelectedElementContext.Provider value={{selectedElement,setSelectedElement}}>
                <div>{children}</div>
                </SelectedElementContext.Provider>
              </EmailTemplateContext.Provider>
            </DragDropLayoutElement.Provider>
          </ScreenSizeContext.Provider>
        </UserDetailcontext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>

  );
}

export default Provider;

// Custom hooks to use the contexts
export const useUserDetail = () => {
  return useContext(UserDetailcontext);
};

export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
};

export const useDragElementLayout = () => {
  return useContext(DragDropLayoutElement);
};

export const useEmailTemplate = () => {
  return useContext(EmailTemplateContext);
};

export const useSelectedElement = () => {
  return useContext(SelectedElementContext);
}