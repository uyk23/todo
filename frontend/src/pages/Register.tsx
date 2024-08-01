import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "registration success", type: "SUCCESS" });
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
      <h2 className="mb-5 text-3xl font-bold">create an account</h2>
      {/* username */}
      <label>
        username
        <input placeholder="username" {...register("username")}></input>
      </label>
      {/* email */}
      <label>
        <span>
          email <span className="text-red-500">*</span>
        </span>
        <input
          type="email"
          placeholder="example@email.com"
          {...register("email", { required: "this field is required" })}
        ></input>
        {errors.email && (
          <span className="error">
            <ExclamationCircleIcon />
            {errors.email.message}
          </span>
        )}
      </label>
      {/* passwords */}
      <div className="flex flex-col gap-5 md:flex-row">
        <label>
          <span>
            password <span className="text-red-500">*</span>
          </span>
          <span className="flex">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="************"
              {...register("password", {
                validate: (val) => {
                  if (!val) {
                    return "this field is required";
                  } else if (val.length < 12) {
                    return "password must be at least 12 characters long";
                  } else if (
                    !val.match(`^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{12,}$`)
                  ) {
                    return "password must include: lowercase letter, uppercase letter, number";
                  }
                },
              })}
            ></input>
            <button
              type="button"
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
        <label>
          <span>
            confirm password <span className="text-red-500">*</span>
          </span>
          <span className="flex">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="************"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "this field is required";
                  } else if (watch("password") !== val) {
                    return "your passwords do not match";
                  }
                },
              })}
            ></input>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              {showConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          </span>
          {errors.confirmPassword && (
            <span className="error">
              <ExclamationCircleIcon />
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
      </div>
      {/* end of inputs */}
      <span className="flex items-center justify-between mt-7">
        <span className="text-sm">
          already registered?{" "}
          <Link className="underline" to="/login">
            log in
          </Link>
        </span>
        <button type="submit" className="primary-btn">
          create
        </button>
      </span>
    </form>
  );
};

export default Register;
