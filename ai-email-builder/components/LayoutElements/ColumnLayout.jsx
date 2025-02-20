"use client";
import {
  useDragElementLayout,
  useEmailTemplate,
  useSelectedElement,
} from "@/app/provider";
import React, { useState } from "react";
import ButtonComponent from "../custom/Element/ButtonComponent";
import TextComponent from "../custom/Element/TextComponent";
import ImageComponent from "../custom/Element/ImageComponent";
import LogoComponent from "../custom/Element/LogoComponent";
import DividerComponent from "../custom/Element/DividerComponent";
import SocialComponent from "../custom/Element/SocialComponent";
import LogoHeaderComponent from "../custom/Element/LogoHeaderComponent";
import { Trash } from "lucide-react";

function ColumnLayout({ layout }) {
  const [dragOver, setDragOver] = useState();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
  const { selectedElement, setSelectedElement } = useSelectedElement();

  const onDragOverHandle = (event, index) => {
    event.preventDefault();
    setDragOver({
      index: index,
      columnId: layout?.id,
    });
  };

  const onDropHandle = () => {
    const { index, columnId } = dragOver;
    console.log("Dropped element:", dragElementLayout?.dragElement);

    setEmailTemplate((prevItems) =>
      prevItems.map((col) =>
        col.id === columnId
          ? {
              ...col,
              [index]: {
                ...dragElementLayout?.dragElement,
                textarea: dragElementLayout?.dragElement?.textarea || "",
              },
            }
          : col
      )
    );

    setDragOver(null);
  };

  const GetElementComponent = (element, index) => {
    // Added index as a parameter
    if (!element) return null;

    if (element?.type === "Button") {
      return <ButtonComponent {...element} />;
    } else if (element?.type === "Text") {
      return (
        <div
          style={{
            ...element.style,
            maxWidth: "100%",
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {element.textarea ? (
            <p
              style={{
                textTransform: element.style?.textTransform,
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                margin: 0,
                padding: "5px",
                maxWidth: "100%",
                lineHeight: "1.5",
              }}
            >
              {element.textarea}
            </p>
          ) : (
            <p>{element.content || "Drag Element Here"}</p>
          )}
          {/* Debugging */}
          {console.log("Text Element Details:", {
            textarea: element.textarea,
            style: element.style,
            computedWidth: document?.querySelector(
              `div[data-index="${layout?.id}-${index}"]`
            )?.offsetWidth,
          })}
        </div>
      );
    } else if (element?.type === "Image") {
      return <ImageComponent {...element} />;
    } else if (element?.type === "Logo") {
      return <LogoComponent {...element} />;
    } else if (element?.type === "Divider") {
      return <DividerComponent {...element} />;
    } else if (element?.type === "SocialIcons") {
      return (
        <SocialComponent
          socialIcons={element.socialIcons}
          style={element.style}
        />
      );
    } else if (element?.type === "LogoHeader") {
      return (
        <LogoHeaderComponent
          imageUrl={element.imageUrl}
          alt={element.alt}
          style={element.style}
        />
      );
    }
    return null;
  };

  console.log("Current layout:", layout);

  const deleteLayout = (layoutId) => {
    const updateEmailTemplate = emailTemplate?.filter(
      (item) => item.id != layoutId
    );
    setEmailTemplate(updateEmailTemplate);
    setSelectedElement(null);
  };

  return (
    <div className="relative">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol},1fr)`,
          gap: "0px",
          maxWidth: "100%",
          width: "100%",
        }}
        className={`${
          selectedElement?.layout?.id === layout?.id &&
          "border border-dashed border-blue-500"
        }`}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            key={index}
            data-index={`${layout?.id}-${index}`} // Unique identifier for debugging
            className={`p-2 flex items-center cursor-pointer ${
              !layout?.[index]?.type && "bg-gray-100 border border-dashed"
            } justify-center ${index === dragOver?.index && dragOver?.columnId} ${
              selectedElement?.layout?.id === layout?.id &&
              selectedElement?.index === index &&
              "border-blue-500 border-4"
            }`}
            style={{ maxWidth: "100%", overflow: "hidden" }}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDrop={onDropHandle}
            onClick={() => setSelectedElement({ layout: layout, index: index })}
          >
            {GetElementComponent(layout?.[index], index) ?? "Drag Element Here"}{" "}
            {/* Pass index */}
          </div>
        ))}

        {selectedElement?.layout?.id === layout?.id && (
          <div
            className="absolute -right-10 cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md"
            onClick={() => deleteLayout(layout?.id)}
          >
            <Trash className="h-4 w-4 text-red-500" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnLayout;
