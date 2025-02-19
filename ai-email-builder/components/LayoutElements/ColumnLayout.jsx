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
                ...dragElementLayout?.dragElement, // Spread the dragged element
                textarea: dragElementLayout?.dragElement?.textarea || "", // Ensure `textarea` is preserved
              },
            }
          : col
      )
    );

    setDragOver(null); // Reset dragOver state after dropping
  };

  const GetElementComponent = (element) => {
    if (!element) return null; // Return null if no element exists

    if (element?.type === "Button") {
      return <ButtonComponent {...element} />;
    } else if (element?.type === "Text") {
      return (
        <div style={element.style}>
          {element.textarea ? (
            <p style={{ textTransform: element.style?.textTransform }}>
              {/* Replace \n with <br> for proper rendering */}
              {element.textarea.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          ) : (
            <p>{element.content || "Drag Element Here"}</p> // Fallback for `content`
          )}
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

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol},1fr)`,
          gap: "0px",
        }}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            key={index}
            className={`p-2 flex items-center cursor-pointer ${
              !layout?.[index]?.type && "bg-gray-100 border border-dashed"
            } justify-center ${
              index === dragOver?.index && dragOver?.columnId && "bg-green-100"
            }
            ${
              selectedElement?.layout?.id === layout?.id &&
              selectedElement?.index === index &&
              "border-blue-500 border-2"
            }`}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDrop={onDropHandle}
            onClick={() => setSelectedElement({ layout: layout, index: index })}
          >
            {GetElementComponent(layout?.[index]) ?? "Drag Element Here"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColumnLayout;
