import { useFormContext } from "react-hook-form";
import { TaskFormData } from "./ManageTaskForm";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  today: Date;
};

const TitleSection = ({ today }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TaskFormData>();

  return (
    <label>
      <span>
        create new task <span className="text-red-500">*</span>
      </span>
      <div className="flex">
        <input
          className="h-10 rounded-e-none"
          {...register("title", {
            required: "task required",
          })}
        ></input>
        <input
          className="h-10 max-w-fit rounded-s-none"
          min={today.toLocaleDateString("sv-SE")}
          type="date"
          {...register("dueDate")}
        ></input>
      </div>
      {errors.title && (
        <span className="error">
          <ExclamationCircleIcon />
          {errors.title.message}
        </span>
      )}
    </label>
  );
};

export default TitleSection;
