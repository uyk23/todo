import { useFormContext } from "react-hook-form";
import { TaskFormData } from "./ManageTaskForm";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

const TagsSection = () => {
  const { register } = useFormContext<TaskFormData>();
  const [tags, setTags] = useState([]);

  return (
    <div className="flex justify-between my-5 md:items-center">
      <div className="flex items-center w-full">
        <span className="font-bold min-w-fit">choose tags:</span>
        <input className="ms-3"></input>
        <button
          className=""
          onClick={(e) => {
            e.preventDefault();
            setTags([]);
          }}
        >
          <PlusCircleIcon />
        </button>
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        {tags.map((tag) => (
          <label className="cursor-pointer category" key={tag}>
            <input
              className="hidden"
              type="checkbox"
              value={tag}
              {...register("tags")}
            />
            <span>{tag}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TagsSection;
