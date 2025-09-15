import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddResume = () => {
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
      formData.append("resume", data.resume[0]);
      const response = await axios.post(
        `${BACKEND_URL}/admin/resume`,
        formData
      );
      alert(response.data.message);
      reset();
    } catch (error) {
      console.log(error);
     alert('failed uplode image.')
    }
  };
  return (
    <div className="w-full md:p-8 p-3 shadow-xl border rounded-xl">
      <div className="w-full    ">
        <h2 className="flex justify-center font-bold text-2xl mb-4">
          Uplode Resume
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
         
          <div>
            <input
              type="file"
              className="w-full p-3 border shadow-xl rounded-xl bg-white translate focus:ring-8 focus:ring-blue-400 focus:outline-none"
              {...register("resume", { required: "Resume is required." })}
            />
            {errors.projectImage && (
              <p className="ps-4 text-sm text-red-600 mt-1">
                {errors.resume.message}
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
              {isSubmitting ? "Uploding.." : "Uplode"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResume;
