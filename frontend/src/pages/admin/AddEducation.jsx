import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddEducation = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async(data) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/admin/education`, data,{withCredentials:true});
    alert(response.data.message);
    reset();
  } catch (error) {
    clearErrors();
    console.log(error);
    if(error.response.data?.errors){
      alert(error.response?.data?.errors);
    }else{
      alert(error.response?.data?.message || "some thing went wrong");
    }
  }
  };
  return (
    <div className="min-h-screen shadow-lg border bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-6">
      <div className="w-full shadow-2xl p-8 bg-white rounded-xl">
        <h2 className="mb-6 font-bold text-2xl text-center text-gray-800">
          Enter Education Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              type="text"
              className="w-full border rounded-lg p-3 focus:ring-8 focus:ring-blue-200 focus:outline-none translate"
              placeholder="Enter your degree or class."
              {...register("degree", {
                required: {
                  value: true,
                  message: "degree or class is required.",
                },
              })}
            />
            {errors.degree && (
              <p className="text-red-500 text-sm mt-1">
                {errors.degree.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter college or Institute"
              className="w-full p-3 border rounded-lg translate focus:ring-8 focus:ring-blue-200 focus:outline-none"
              {...register("college", {
                required: {
                  value: true,
                  message: "college or Institute are required.",
                },
              })}
            />
            {errors.college && (
              <p className="text-red-500 text-sm mt-1">
                {errors.college.message}
              </p>
            )}
          </div>
          <div>
            <textarea
              placeholder="Enter description"
              className="w-full  border resize-none h-28 p-3 rounded-lg  translate focus:ring-8 focus:ring-blue-200 focus:outline-none"
              {...register("description", {
                required: { value: true, message: "description is required." },
              })}
            ></textarea>
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.discription.message}
              </p>
            )}
          </div>
          <div>
            <label className=" p-3 px-8 mr-2 border rounded-lg ">
              Star Date
            </label>
            <input
              type="date"
              className="w-3/4 p-3 border rounded-lg translate focus:ring-8 focus:ring-blue-200 focus: outline-none"
              {...register("start", {
                required: {
                  value: true,
                  message: "staring date collge or class are required,",
                },
              })}
            />
            {errors.start && (
              <p className="text-sm text-red-500 mt-1">
                {errors.start.message}
              </p>
            )}
          </div>
          <div>
            <label className=" p-3 px-8 mr-2 border rounded-lg ">
              End Date
            </label>
            <input
              type="date"
              placeholder="Ending date of degree or class"
              className="w-3/4 p-3 border rounded-lg translate focus:ring-8 focus:ring-blue-200 focus:outline-none"
              {...register("end", {
                required: {
                  value: true,
                  message: "End date of degree or class.",
                },
              })}
            />
            {errors.end && (
              <p className="text-sm text-red-500 mt-1">{errors.end.message}</p>
            )}
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-1/3 py-3 rounded-lg text-white font-semibold translate ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "submiting..." : "submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEducation;
