import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      showToast({ message: "successfully logged in", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5 mx-5" onSubmit={onSubmit}>
      <h2 className="mb-5 text-3xl font-bold">log in</h2>
      {/* email */}
      <label>
        <span>email</span>
        <input
          type="email"
          {...register("email", { required: "please enter your email" })}
        ></input>
        {errors.email && (
          <span className="error">
            <ExclamationCircleIcon />
            {errors.email.message}
          </span>
        )}
      </label>
      {/* passwords */}
      <label>
        <span>password</span>
        <span className="flex">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "please enter your password",
            })}
          ></input>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        </span>
        {errors.password && (
          <span className="error">
            <ExclamationCircleIcon />
            {errors.password.message}
          </span>
        )}
      </label>
      {/* end of inputs */}
      <span className="flex items-center justify-between mt-7">
        <span className="text-sm">
          don't have an account?{" "}
          <Link className="underline" to="/register">
            register here
          </Link>
        </span>
        <button type="submit" className="primary-btn">
          log in
        </button>
      </span>
    </form>
  );
};

export default Login;
