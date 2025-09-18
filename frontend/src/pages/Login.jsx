import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/login`, data, {
        withCredentials: true,
      });

      alert(response.data.message || "Login successful!");

      if (response.data.success) {
        navigate("/portfolio-admin");
      }

      reset();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-5xl max-h-full p-4">
      <h2 className="text-center font-bold text-2xl">Admin Login</h2>
      <div className="h-1 w-24 bg-blue-600 rounded-xl mx-auto mt-1"></div>
      <div className="w-full md:w-1/2 border rounded-lg shadow-lg p-6 mx-auto mt-6">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full rounded-xl border shadow-lg p-3 focus:ring-8 focus:ring-blue-400 focus:outline-none"
              {...register("email", {
                required: "Email is required.",
              })}
            />
            {errors.email && (
              <p className="ps-3 mt-1 text-sm text-red-700">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 border rounded-xl shadow-lg focus:ring-8 focus:ring-blue-400 focus:outline-none"
              {...register("password", {
                required: "Password is required.",
              })}
            />
            {errors.password && (
              <p className="ps-4 mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-3 mb-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 md:w-1/4 rounded-xl bg-blue-500 p-3 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
