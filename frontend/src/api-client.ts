import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import { UserType, TaskType } from "../../backend/src/shared/types";
import { TaskFormData } from "./forms/TaskForm/ManageTaskForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("error fetching user");
  }

  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const login = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "wrong credentials");
  }
};

export const logOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("error during log out, please try again");
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("token invalid");
  }

  return response.json();
};

export const addTask = async (formData: TaskFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("failed to add task");
  }

  return await response.json();
};

export const fetchTasks = async (): Promise<TaskType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("error fetching tasks");
  }

  return response.json();
};

// export const fetchTaskById = async (taskId: string): Promise<TaskType> => {
//   const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
//     credentials: "include",
//   });

//   if (!response.ok) {
//     throw new Error("error fetching task");
//   }

//   return response.json();
// };
