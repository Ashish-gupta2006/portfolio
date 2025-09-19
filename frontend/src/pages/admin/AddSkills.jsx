import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddSkills = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async(data) => {
    clearErrors();
    try {
      const response = await axios.post(`${BACKEND_URL}/admin/skills`,data,{withCredentials:true});
      console.log(response);
      alert(response.data.message);
      reset();
    } catch (error) {
      if(error.response.data?.errors){
        alert(error.response?.data?.errors);
      }else{
        alert(error.response?.data?.message|| 'some thing went wrong.');
      }
    }
  };
  return (
    <div className="w-full p-3 md:p-8 border rounded-lg shadow-lg">
      <div className="w-full ">
        <h2 className="font-bold text-center text-2xl mb-4">
          {" "}
          Enter Skill Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter skill name."
              className="w-full p-3 border rounded-xl translate focus:ring-8 focus:ring-blue-400 focus:outline-none shadow-lg "
              {...register("skillName", {
                required: {
                  value: true,
                  message: "skill name is required.",
                },
              })}
            />
            {errors.skillName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.skillName.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="number"
              placeholder="Rate your skill proficiency (1-100)"
              className="w-full border rounded-xl p-3 shadow-lg appearance-none [moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none 
  [&::-webkit-outer-spin-button]:appearance-none focus:ring-8 focus:ring-blue-400 focus:outline-none"
              {...register("level", {
                required: "Proficiency is required.",
                min: {
                  value: 1,
                  message: "Minimum proficiency is 1",
                },
                max: {
                  value: 100,
                  message: "Maximum proficiency is 100",
                },
              })}
            />

            {errors.level && (
              <p className="text-red-600 text-sm mt-1">
                {errors.level.message}
              </p>
            )}
          </div>
          <div className="flex justify-center items-center  ">
            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-1/2 md:1/3 py-3 text-white font-semibold  border rounded-xl translate ${
                isSubmitting ? "bg-slate-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-800"
               } `}
            >
              {isSubmitting ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkills;
