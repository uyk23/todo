export type UserType = {
  _id: string;
  email: string;
  password: string;
  username: string;
};

export type TaskType = {
  _id: string;
  userId: string;
  title: string;
  detail: string;
  categories: string[];
  dueDate: string;
  tags: string[];
};
