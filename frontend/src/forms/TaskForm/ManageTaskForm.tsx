import { FormProvider, useForm } from "react-hook-form";
import { TaskType } from "../../../../backend/src/shared/types";
import { month, weekday } from "../../config/date-config";
import TitleSection from "./TitleSection";
import CategoriesSection from "./CategoriesSection";
import DetailsSection from "./DetailsSection";
import { useEffect } from "react";

export type TaskFormData = {
  id: string;
  title: string;
  detail: string;
  categories: string[];
  dueDate: string;
  tags: string[];
};

type Props = {
  task?: TaskType;
  onSave: (TaskFormData: TaskFormData) => void;
  isLoading: boolean;
};

const ManageTaskForm = ({ onSave, isLoading, task }: Props) => {
  const today = new Date(new Date().toLocaleDateString());
  const formMethods = useForm<TaskFormData>();
  const { reset, handleSubmit } = formMethods;

  useEffect(() => {
    reset(task);
  }, [task, reset]);

  const onSubmit = handleSubmit((formData: TaskFormData) => {
    if (task) {
      formData.id = task._id;
    }
    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="mx-5" onSubmit={onSubmit}>
        <h2 className="mb-5 text-3xl font-bold cursor-default">
          {weekday[today.getDay()]} - {month[today.getMonth()]}{" "}
          {today.getDate()}
        </h2>
        <TitleSection today={today} />
        <CategoriesSection />
        <DetailsSection />
        <span className="flex justify-end gap-2">
          <button
            className="primary-btn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            cancel
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="primary-btn disabled:bg-gray-300 disabled:text-slate-800"
          >
            {isLoading ? "saving..." : "save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageTaskForm;
