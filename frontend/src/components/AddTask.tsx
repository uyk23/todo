import { useQueryClient, useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import ManageTaskForm, { TaskFormData } from "../forms/TaskForm/ManageTaskForm";
import * as apiClient from "../api-client";

const AddTask = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addTask, {
    onSuccess: () => {
      showToast({ message: "task saved", type: "SUCCESS" });
      queryClient.invalidateQueries({ queryKey: ["all"] });
    },
    onError: () => {
      showToast({ message: "error saving task", type: "ERROR" });
    },
  });

  const handleSave = (taskFormData: TaskFormData) => {
    mutate(taskFormData);
  };

  return <ManageTaskForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddTask;
