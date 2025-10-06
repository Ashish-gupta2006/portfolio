import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddTools = () => {
  const [tools, setTools] = useState([]);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const getTools = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/portfolio/tool`);
      setTools(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Something want wrong.");
    }
  };

  const onSubmit = async (data) => {
    clearErrors();
    try {
      const formData = new FormData();
      if (edit) {
        if (data.tool_image[0]) {
          formData.append("tool_image", data.tool_image[0]);
        }
        formData.append("title", data.title);
        console.log(formData);
        const response = await axios.put(
          `${BACKEND_URL}/admin/tools/${id}`,
          formData,
          { withCredentials: true }
        );
        toast.success(response.data?.message || "Edit successfully!");
        reset({
          tool_image:"",
          title:""
        });
        getTools();
      } else {
        formData.append("tool_image", data.tool_image[0]);
        formData.append("title", data.title);
        const response = await axios.post(
          `${BACKEND_URL}/admin/tools`,
          formData,
          { withCredentials: true }
        );
        toast.success(response?.data?.message || "Tool added successfully");
        reset();
        getTools();
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/admin/tools/${id}`, {
        withCredentials: true,
      });
      toast.success(response.data?.message || "successfully deleted!");
      getTools();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data?.message || error.response?.data?.errors);
    }
  };

  const handleEdit = async (tool) => {
    setId(tool._id);
    setEdit(true);
    reset({
      tool_image: tool.tool_image,
      title: tool.title,
    });
  };

  useEffect(() => {
    getTools();
  }, []);

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
              {...register(
                "tool_image",
                edit ? {} : { required: " image is required" }
              )}
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
              <p className="text-sm px-5 text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={` md:w-1/3 w-1/2 rounded-xl py-3 text-white text-xl font-semibold ${
                isSubmitting
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-800"
              }`}
            >
              {isSubmitting ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* show all tools in  grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {tools.map((tool) => (
          <div
            key={tool._id}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-5 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-center items-center mb-4">
              <img
                src={tool.image.url}
                alt={`${tool._id}image`}
                className="w-24 h-24 object-contain"
              />
            </div>
            <p className="text-center font-semibold text-lg text-gray-700">
              {tool.title}
            </p>
            <div className="flex justify-center mt-5">
              <button
                className="bg-red-600 p-2 rounded-lg hover:bg-red-700 text-white font-medium"
                onClick={() => {
                  handleDelete(tool._id);
                }}
              >
                Delete
              </button>
              <button
                className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 text-white font-medium ml-4 w-16"
                onClick={() => {
                  handleEdit(tool);
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

export default AddTools;
