import { useState, useEffect, use } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddProject = () => {
  const [project, setProject] = useState([]);
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
    clearErrors();
    try {
      if (edit) {
        const formData = new FormData();
        if (data.projectImage[0]) {
          formData.append("projectImage", data.projectImage[0]);
        }
        formData.append("projectName", data.projectName);
        formData.append("description", data.description);
        const response = await axios.put(
          `${BACKEND_URL}/admin/project/${id}`,
          formData,
          {
            withCredentials: true,
          }
        );
        toast.success(response?.data?.message);
        reset({
          projectName: "",
          description: "",
        });
        setEdit(false);
        getProject();
      } else {
        const formData = new FormData();
        formData.append("projectName", data.projectName);
        formData.append("projectImage", data.projectImage[0]);
        formData.append("description", data.description);
        const response = await axios.post(
          `${BACKEND_URL}/admin/project`,
          formData,
          { withCredentials: true }
        );
        toast.success(response?.data?.message);
        reset();
        getProject();
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.errors) {
        toast.error(error.response?.data?.errors);
      } else {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const getProject = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/portfolio/project`);
      setProject(response.data.data);
    } catch (error) {
      console.log(error);
      if (error.response?.data?.errors) {
        toast.error(error.response?.data?.errors);
      } else {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const handleDelete = async (proId) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/admin/project/${proId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      getProject();
    } catch (error) {
      console.log(error);
      if (error.response?.data?.errors) {
        toast.error(error.response?.data?.errors);
      } else {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const handleEdit = (pro) => {
    setEdit(true);
    setId(pro._id);
    reset({
      projectName: pro.projectName,
      description: pro.description,
    });
  };
  useEffect(() => {
    getProject();
  }, []);

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
              {...register(
                "projectImage",
                edit ? {} : { required: "Image is required." }
              )}
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
      <div className="mt-10 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.map((pro) => (
          <div
            className=" bg-white border rounded-xl shadow-xl p-3 "
            key={pro._id}
          >
            <div className="w-full h-40">
              <img
                src={pro.projectImage.url}
                alt={pro.projectImage.fileName}
                className="w-full h-full object-contain"
              />
            </div>
            <p>
              <strong>Project name:- </strong>
              {pro.projectName}
            </p>
            <p>
              <strong>Description :- </strong>
              {pro.description}
            </p>
            <div className="flex justify-center mt-3  ">
              <button
                className="bg-red-600 hover:bg-red-800 text-white font-semibold px-3 py-2 rounded-lg"
                onClick={() => {
                  handleDelete(pro._id);
                }}
              >
                Delete
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-3 py-2 rounded-lg ms-3 w-16"
                onClick={() => {
                  handleEdit(pro);
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

export default AddProject;
