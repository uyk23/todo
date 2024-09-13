import { useFormContext } from "react-hook-form";
import { TaskFormData } from "./ManageTaskForm";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const CategoriesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TaskFormData>();

  return (
    <div>
      <div className="flex justify-between my-5 md:items-center">
        <span className="mt-4 font-bold cursor-default md:mt-0">
          choose categories:
        </span>
        <div className="flex flex-col gap-5 md:flex-row">
          {["today", "tomorrow", "this week"].map((category) => (
            <label className="cursor-pointer category" key={category}>
              <input
                className="hidden"
                type="checkbox"
                value={category}
                {...register("categories", {
                  validate: (categories) => {
                    if (categories && categories.length > 0) {
                      return true;
                    } else {
                      return "choose at least one category";
                    }
                  },
                })}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>
      {errors.categories && (
        <span className="error">
          <ExclamationCircleIcon />
          {errors.categories.message}
        </span>
      )}
    </div>
  );
};

export default CategoriesSection;
