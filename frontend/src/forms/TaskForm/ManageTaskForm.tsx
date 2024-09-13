import { FormProvider, useForm } from "react-hook-form";
import { TaskType } from "../../../../backend/src/shared/types";
import { month, weekday } from "../../config/date-config";
import TitleSection from "./TitleSection";
import CategoriesSection from "./CategoriesSection";
import DetailsSection from "./DetailsSection";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    reset(task);
  }, [task, reset]);

  const onSubmit = handleSubmit((formData: TaskFormData) => {
    if (task) {
      formData.id = task._id;
    }
    onSave(formData);
    reset(task);
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <h2 className="mb-5 text-3xl font-bold cursor-default">
          {weekday[today.getDay()]} - {month[today.getMonth()]}{" "}
          {today.getDate()}
        </h2>
        <div className="rounded-xl bg-[var(--task-color)] p-3 mb-5">
          <h3 className="w-full text-lg font-bold">
            <button
              className="flex items-center justify-between w-full"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
            >
              add tasks
              {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
          </h3>
          <div
            className={
              "p-5 mt-1 bg-[var(--main-bg-color)] transition-all rounded-xl " +
              (open ? "block" : "hidden")
            }
          >
            <TitleSection today={today} />
            <CategoriesSection />
            <DetailsSection />
            <span className="flex justify-end gap-2">
              <button
                className="primary-btn"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  reset(task);
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
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageTaskForm;
