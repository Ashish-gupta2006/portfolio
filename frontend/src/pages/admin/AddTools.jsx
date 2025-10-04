import React from 'react'
import{useForm} from 'react-hook-form'
import axios from 'axios'
import {toast} from 'react-toastify'
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL
const AddTools = () => {
  const{
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState:{errors, isSubmitting}
  }= useForm();

  const onSubmit= async(data)=>{
    clearErrors();
    try {
      const formData = new FormData();
      formData.append('tool_image',data.tool_image[0]);
      formData.append("title",data.title);
      const response = await axios.post(`${BACKEND_URL}/admin/tools`, formData,{withCredentials:true});
      toast.success(response?.data?.message||'Tool added successfully');
      reset();
    } catch (error) {
      console.log(error);
      if(error.response?.data?.errors){
        toast.error(error.response?.data?.errors);
      }else{
        toast.error(error.response?.data?.message);
      }
    }
  }
  return (
    <div className="w-full p-3 md:p-8 border rounded-xl shadow-xl">
      <div className="w-full">
        <h2 className="flex justify-center font-bold text-2xl mb-5 ">
          Enter Tool Details.
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="file"
              className="w-full p-3 border rounded-xl shadow-xl translate-x-0 focus:ring-8 focus:ring-blue-500 "
              {...register("tool_image", {
                required: " image is required",
              })}
            />
            {errors.tool_image && (
              <p className="text-sm px-5 text-red-600 mt-1">
                {errors.tool_image.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter tool title or name."
              className="w-full p-3 border shadow-xl rounded-xl  translate-x-0 focus:ring-8 focus:ring-blue-400 focus:outline-none"
              {...register("title", { required: " title is required." })}
            />
            {errors.title && (
              <p className="text-sm px-5 text-red-600 mt-1">{errors.title.message}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button type="submit" className={` md:w-1/3 w-1/2 rounded-xl py-3 text-white text-xl font-semibold ${isSubmitting?'bg-slate-400 cursor-not-allowed':'bg-blue-600 hover:bg-blue-800'}`}>{isSubmitting ?'Submiting...':'Submit'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTools