import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  const styles = type === "SUCCESS" ? "toast-success" : "toast-error";
  return (
    <div className={styles}>
      <span className="flex items-center text-lg font-semibold">
        {type === "SUCCESS" ? <CheckCircleIcon /> : <ExclamationCircleIcon />}
        {message}
      </span>
    </div>
  );
};

export default Toast;
