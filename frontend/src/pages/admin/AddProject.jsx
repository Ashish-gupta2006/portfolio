import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddProject = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    clearErrors();
    try {
      const formData = new FormData();
      formData.append("projectName", data.projectName);
      formData.append("projectImage", data.projectImage[0]);
      formData.append("description", data.description);
      const response = await axios.post(
        `${BACKEND_URL}/admin/project`,
        formData
      );
      alert(response.data.message);
      reset();
    } catch (error) {
      console.log(error);
      if(error.response?.data?.errors){
        alert(error.response?.data?.errors);
      }else{
        alert(error.response?.data?.message);
      }
    }
  };
  return (
    <div className="w-full md:p-8 p-3 shadow-xl border rounded-xl">
      <div className="w-full    ">
        <h2 className="flex justify-center font-bold text-2xl mb-4">
          Enter Project Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div>
            {" "}
            <input
              type="text"
              placeholder="Enter project name."
              className="w-full p-3 border rounded-xl shadow-xl translate focus:ring-8 focus:ring-blue-400 focus:outline-none"
              {...register("projectName", {
                required: "project name is required.",
              })}
            />
            {errors.projectName && (
              <p className="ps-4 text-sm text-red-600 mt-1">
                {errors.projectName.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="file"
              className="w-full p-3 border shadow-xl rounded-xl bg-white translate focus:ring-8 focus:ring-blue-400 focus:outline-none"
              {...register("projectImage", { required: "Image is required." })}
            />
            {errors.projectImage && (
              <p className="ps-4 text-sm text-red-600 mt-1">
                {errors.projectImage.message}
              </p>
            )}
          </div>
          <div>
            <textarea
              placeholder="description minimum(100) characters"
              className="w-full resize-none h-28 bg-white border rounded-xl shadow-xl p-3 translate focus:ring-8 focus:ring-blue-400 focus:outline-none"
              {...register("description", {
                required: "project description is requied.",
              })}
            ></textarea>
            {errors.description && (
              <p className="ps-4 mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-1/2 md:w-1/3 py-3 text-white font-semibold rounded-lg ${
                isSubmitting
                  ? "bg-slate-500  cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-800"
              }`}
            >
              {" "}
              {isSubmitting ? "Sumbmiting.." : "Sumbit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
