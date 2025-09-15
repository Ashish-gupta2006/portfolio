import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddCertificate = () => {
   const {
     register,
     handleSubmit,
     reset,
     clearErrors,
     formState: { errors, isSubmitting },
   } = useForm();

   const onSubmit = async (data) => {
     try {
      const formData = new FormData();
        formData.append('title',data.title);
        formData.append("image", data.image[0]);
        formData.append("institute", data.institute);
        formData.append('start', data.start);
        formData.append('end', data.end);
      console.log(formData);
       const response = await axios.post(
         `${BACKEND_URL}/admin/certificate`,
         formData
       );
       console.log(response);
       alert(response.data.message);
       reset();
     } catch (error) {
       clearErrors();
       console.log(error);
       if (error.response.data?.errors) {
         alert(error.response?.data?.errors);
       } else {
         alert(error.response?.data?.message || "some thing went wrong");
       }
     }
   };
   return (
     <div className="min-h-screen shadow-lg border bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-6">
       <div className="w-full shadow-2xl p-8 bg-white rounded-xl">
         <h2 className="mb-6 font-bold text-2xl text-center text-gray-800">
           Enter Certification Details
         </h2>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
           <div>
             <input
               type="file"
               className="w-full border rounded-lg p-3 focus:ring-8 focus:ring-blue-200 focus:outline-none translate"
               {...register("image", {
                 required: {
                   value: true,
                   message: "certificate iamge is required.",
                 },
               })}
             />
             {errors.title && (
               <p className="text-red-500 text-sm mt-1 p-2">
                 {errors.title.message}
               </p>
             )}
           </div>
           <div>
             <input
               type="text"
               className="w-full border rounded-lg p-3 focus:ring-8 focus:ring-blue-200 focus:outline-none translate"
               placeholder="Enter certificate title"
               {...register("title", {
                 required: {
                   value: true,
                   message: "title  is required.",
                 },
               })}
             />
             {errors.title && (
               <p className="text-red-500 text-sm mt-1 p-2">
                 {errors.title.message}
               </p>
             )}
           </div>
           <div>
             <input
               type="text"
               placeholder="Enter Institute name "
               className="w-full p-3 border rounded-lg translate focus:ring-8 focus:ring-blue-200 focus:outline-none"
               {...register("institute", {
                 required: {
                   value: true,
                   message: " Institute name is required.",
                 },
               })}
             />
             {errors.institute && (
               <p className="text-red-500 text-sm mt-1">
                 {errors.institute.message}
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
                   message: "staring date ,",
                 },
               })}
             />
             {errors.start && (
               <p className="text-sm text-red-500 mt-1 p-2">
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
               placeholder="complation data of certification"
               className="w-3/4 p-3 border rounded-lg translate focus:ring-8 focus:ring-blue-200 focus:outline-none"
               {...register("end", {
                 required: {
                   value: true,
                   message: "completation date of certification",
                 },
               })}
             />
             {errors.end && (
               <p className="text-sm text-red-500 mt-1 p-2">
                 {errors.end.message}
               </p>
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
}

export default AddCertificate;