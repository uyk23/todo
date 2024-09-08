import { useFormContext } from "react-hook-form";
import { TaskFormData } from "./ManageTaskForm";

const DetailsSection = () => {
  const { register } = useFormContext<TaskFormData>();

  return (
    <label>
      <span>add more details</span>
      <textarea rows={5} {...register("detail")}></textarea>
    </label>
  );
};

export default DetailsSection;
