import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";
import {
  ClockIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

interface Props {
  page: string;
}

const ShowTasks = ({ page }: Props) => {
  const msInDay = 86400000;
  const { isLoggedIn } = useAppContext();
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: () => apiClient.fetchTasks(page),
  });

  const daysLeft = (date: string) => {
    const today = new Date().getTime();
    const due = new Date(date + ", 11:59:59").getTime();
    const timeLeft = due - today;

    if (timeLeft <= msInDay) {
      return 1;
    } else if (timeLeft <= msInDay * 3) {
      return 2;
    } else {
      return 3;
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {isLoggedIn ? (
        query.data?.map((task) => (
          // task
          <div
            className="grid flex-1 grid-cols-1 grid-rows-3 gap-3 task basis-1/2 md:basis-1/3 lg:basis-1/4"
            key={task._id}
          >
            <div className="flex items-center justify-between px-1 border-b-2">
              <h2 className="w-4/5 truncate ease-in text-l hover:text-wrap">
                {task.title}
              </h2>
              <div className="flex">
                <PencilSquareIcon />
                <TrashIcon />
              </div>
            </div>
            <div className="flex flex-col justify-between row-span-2 gap-5">
              <div>
                {task.dueDate ? (
                  <p
                    className={
                      "flex items-center rounded-lg " +
                      (daysLeft(task.dueDate) === 1
                        ? "bg-[var(--warning-color-1)]"
                        : daysLeft(task.dueDate) === 2
                        ? "bg-[var(--warning-color-2)]"
                        : "bg-[var(--warning-color-3)]")
                    }
                  >
                    <ClockIcon />
                    {task.dueDate}
                  </p>
                ) : (
                  <></>
                )}
                <p className="p-1">{task.detail}</p>
              </div>
              <div className="flex self-end gap-3 mr-auto text-xs">
                {task.categories.map((category) => (
                  <p
                    key={category}
                    className="p-1 bg-[var(--main-bg-color)] rounded-lg"
                  >
                    {category}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          please
          <em>
            <em>
              <Link to="/login">log in</Link>
            </em>
          </em>
          to create and view your tasks
        </div>
      )}
    </div>
  );
};

export default ShowTasks;
