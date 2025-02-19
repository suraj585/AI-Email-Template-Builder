import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DropdownField({label,value,options,onHandleStyleChange}) {
  return (
    <div>
      <label>{label}</label>
      <Select onValueChange={(v) => onHandleStyleChange(v)} defaultOpen={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((options, index) => (
            <SelectItem value={options} key={index}>
              {options}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default DropdownField