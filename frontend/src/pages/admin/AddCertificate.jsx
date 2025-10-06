import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { fullDateFormate, monthYearFormate } from "../../helper/formateDate";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
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
      if (edit) {
        if (data.image[0]) {
          formData.append("image", data.image[0]);
        }
        formData.append("title", data.title);
        formData.append("institute", data.institute);
        formData.append("start", data.start);
        formData.append("end", data.end);
        const res = await axios.put(
          `${BACKEND_URL}/admin/certificate/${id}`,
          formData,
          { withCredentials: true }
        );
        toast.success(res.data.message);
        reset({
          title: "",
          image:"",
          institute: "",
          start: "",
          end: "",
        });
        getCertificate();
        setEdit(false);
      } else {
        formData.append("title", data.title);
        formData.append("image", data.image[0]);
        formData.append("institute", data.institute);
        formData.append("start", data.start);
        formData.append("end", data.end);
        const response = await axios.post(
          `${BACKEND_URL}/admin/certificate`,
          formData,
          { withCredentials: true }
        );
        toast.success(response?.data?.message);
        reset();
        getCertificate();
      }
    } catch (error) {
      clearErrors();
      console.log(error);
      console.log(error.response);
      if (error.response.data?.errors) {
        toast.error(error.response?.data?.errors.join(", "));
      } else {
        toast.error(error.response?.data?.message || "some thing went wrong");
      }
    }
  };

  const getCertificate = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/portfolio/certificate`);
      setCertificates(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/admin/certificate/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      getCertificate();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const handleEdit = (certificate) => {
    setEdit(true);
    setId(certificate._id);
    reset({
      title: certificate.title,
      institute: certificate.institute,
      start: fullDateFormate(certificate.start),
      end: fullDateFormate(certificate.end),
    });
  };

  useEffect(() => {
    getCertificate();
  }, []);
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
              {...register(
                "image",
                edit
                  ? {}
                  : {
                      required: {
                        value: true,
                        message: "certificate iamge is required.",
                      },
                    }
              )}
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

      {/* shor all certificate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl mt-10 rounded-xl">
        {certificates.map((certificate) => (
          <div className="bg-whites shadow-lg" key={certificate._id}>
            <div className="p-2">
              <img
                src={certificate.image.url}
                alt={`certi_${certificate._id}`}
                className="h-52 w-full object-cover rounded-ss-xl rounded-se-lg mt-2"
              />
            </div>
            <div className=" ps-2 mt-0 mb-6">
              <h2 className="font-semibold  text-2xl mt-0 italic text-gray-700">
                {certificate.title}
              </h2>
              <p className="font-medium mt-0 italic text-gray-600">
                {certificate.institute}
              </p>
              <p className="text-sm text-gray-600 italic">
                {monthYearFormate(certificate.start)}&nbsp;-&nbsp;
                {monthYearFormate(certificate.end)}
              </p>
            </div>
            <div className="flex justify-center mb-3">
              <button
                className="bg-red-600 p-2 rounded-xl text-white font-medium hover:bg-red-800 active:bg-red-200"
                onClick={() => {
                  handleDelete(certificate._id);
                }}
              >
                Delete
              </button>
              <button
                className="bg-blue-600 p-2 rounded-xl w-16 ml-5 text-white font-medium hover:bg-blue-800 active:bg-blue-200"
                onClick={() => {
                  handleEdit(certificate);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCertificate;
