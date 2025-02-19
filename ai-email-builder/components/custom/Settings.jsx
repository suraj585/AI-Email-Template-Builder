"use client";
import { useSelectedElement } from "@/app/provider";
import React, { useContext, useEffect, useState } from "react";
import InputField from "./Settings/InputField";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import ColorPickerField from "./Settings/ColorPickerField";
import InputStyleField from "./Settings/InputStyleField";
import SliderField from "./Settings/SliderField";
import { isEqual } from "lodash";
import ToogleGroupField from "./Settings/ToogleGroupField";
import {
  AArrowUp,
  AlignCenter,
  AlignLeft,
  AlignRight,
  CaseLower,
  CaseUpper,
} from "lucide-react";
import TextAreaField from "./Settings/TextAreaField";
import DropdownField from "./Settings/DropdownField";

const TextAlignOptions = [
  {
    value: "left",
    icon: AlignLeft,
  },
  {
    value: "center",
    icon: AlignCenter,
  },
  {
    value: "right",
    icon: AlignRight,
  },
];

const TextTransformOptions = [
  {
    value: "lowercase",
    icon: CaseLower,
  },
  {
    value: "uppercase",
    icon: CaseUpper,
  },
  {
    value: "capitalize",
    icon: AArrowUp,
  },
];

function Settings() {
  const { selectedElement, setSelectedElement } = useSelectedElement();
  const [element, setElement] = useState();
  const { emailTemplate, setEmailTemplate } = useContext(EmailTemplateContext);

  useEffect(() => {
    const layout = selectedElement?.layout?.[selectedElement?.index];
    console.log("Layout:", layout); // Debug: check if layout is defined
    if (layout) {
      setElement({
        ...layout,
        style: {
          ...layout.style,
          fontSize: layout.style?.fontSize || "16px",
          padding: layout.style?.padding || "10px",
          width: layout.style?.width || "100%",
          borderRadius: layout.style?.borderRadius || "0px",
        },
        // Always initialize textarea even if empty
        textarea: layout.textarea !== undefined ? layout.textarea : "",
      });
    }
  }, [selectedElement]);

  const onHandleInputChange = (fieldName, value) => {
    console.log("Updating Field:", fieldName, "Value:", value);
    const updatedData = { ...selectedElement };
    updatedData.layout[selectedElement.index][fieldName] = value;
    setSelectedElement(updatedData);
  };

  useEffect(() => {
    if (selectedElement && emailTemplate) {
      let updatedEmailTemplates = [];
      let hasChanged = false;
      emailTemplate.forEach((item) => {
        if (item.id === selectedElement?.layout?.id) {
          if (!isEqual(item, selectedElement?.layout)) {
            updatedEmailTemplates.push(selectedElement?.layout);
            hasChanged = true;
          } else {
            updatedEmailTemplates.push(item);
          }
        } else {
          updatedEmailTemplates.push(item);
        }
      });
      if (hasChanged) {
        setEmailTemplate(updatedEmailTemplates);
      }
    }
  }, [selectedElement, emailTemplate]);

  const onHandleStyleChange = (fieldName, fieldValue) => {
    const updateElement = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...selectedElement?.layout[selectedElement?.index],
          style: {
            ...selectedElement?.layout[selectedElement?.index]?.style,
            [fieldName]: fieldValue,
          },
        },
      },
    };
    setSelectedElement(updateElement);
  };

  return (
    <div className="p-5 flex flex-col gap-4">
      <h2 className="font-bold text-xl">Settings</h2>
      {element?.content && (
        <InputField
          label="Content"
          value={element.content}
          onHandleInputChange={(value) => onHandleInputChange("content", value)}
        />
      )}
      {element?.textarea && (
        <TextAreaField
          label="Text Area"
          value={element.textarea}
          onHandleInputChange={(value) =>
            onHandleInputChange("textarea", value)
          }
        />
      )}
      {element?.url && (
        <InputField
          label="URL"
          value={element.url}
          onHandleInputChange={(value) => onHandleInputChange("url", value)}
        />
      )}
      {element?.style?.width && (
        <SliderField
          label="Width"
          value={element.style.width}
          type="%"
          onHandleStyleChange={(value) => onHandleStyleChange("width", value)}
        />
      )}
      {element?.style.textAlign && (
        <ToogleGroupField
          label={"Text Align"}
          value={element?.style.textAlign}
          options={TextAlignOptions}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("textAlign", value)
          }
        />
      )}
      {element?.style?.backgroundColor && (
        <ColorPickerField
          label="Background Color"
          value={element.style.backgroundColor}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("backgroundColor", value)
          }
        />
      )}
      {element?.style?.color && (
        <ColorPickerField
          label="Text Color"
          value={element.style.color}
          onHandleStyleChange={(value) => onHandleStyleChange("color", value)}
        />
      )}
      {element?.style?.fontSize && (
        <InputStyleField
          label="Font Size"
          value={element.style.fontSize}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("fontSize", value)
          }
        />
      )}
      {element?.style.textTransform && (
        <ToogleGroupField
          label={"Text Transform"}
          value={element?.style.textTransform}
          options={TextTransformOptions} // Correct options
          onHandleStyleChange={(value) =>
            onHandleStyleChange("textTransform", value)
          }
        />
      )}
      <div>
        <h3 className="font-bold">Preview:</h3>
        <p>
          <strong>Content:</strong>{" "}
          <span style={{ textTransform: element?.style?.textTransform }}>
            {element?.content || "No content entered"}
          </span>
        </p>
        <p>
          <strong>Text Area:</strong>{" "}
          <span style={{ textTransform: element?.style?.textTransform }}>
            {element?.textarea || "No text entered"}
          </span>
        </p>
      </div>
      {element?.style?.padding && (
        <InputStyleField
          label="Padding"
          value={element.style.padding}
          onHandleStyleChange={(value) => onHandleStyleChange("padding", value)}
        />
      )}
      {element?.style?.borderRadius && (
        <SliderField
          label="Border Radius"
          value={element.style.borderRadius}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("borderRadius", value)
          }
        />
      )}

      {element?.style?.fontWeight && (
        <DropdownField
          label="Font Width"
          value={element.style.fontWeight}
          options={['normal','bold']}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("fontWeight", value)
          }
        />
      )}
    </div>
  );
}

export default Settings;
