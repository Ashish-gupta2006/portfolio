import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddSkills = () => {
  const [edit, setEdit] = useState(false);
  const [skills, setSkills] = useState([]);
  const [id, setId] = useState(null);

  const getSkills = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/portfolio/skill`);
      setSkills(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
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
      if (!edit) {
        const response = await axios.post(`${BACKEND_URL}/admin/skills`, data, {
          withCredentials: true,
        });
        toast.success(response.data.message);
        reset();
        getSkills();
      } else {
        const response = await axios.put(
          `${BACKEND_URL}/admin/skills/${id}`,
          data,
          {
            withCredentials: true,
          }
        );
        toast.success(response.data.message);
        reset({
          skillName:"",
          level: "",
        });
        getSkills();
        setEdit(false);
        setId(null);
      }
    } catch (error) {
      if (error.response.data?.errors) {
        toast.error(error.response?.data?.errors);
      } else {
        toast.error(error.response?.data?.message || "some thing went wrong.");
      }
    }
  };

  const handleEdit = (skill) => {
    setEdit(true);
    setId(skill._id);
    reset({
      skillName: skill.skillName,
      level: skill.level,
    });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${BACKEND_URL}/admin/skills/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        getSkills();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "some thing went wrong.");
      });
  };

  useEffect(() => {
    getSkills();
  }, []);
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
                isSubmitting
                  ? "bg-slate-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-800"
              } `}
            >
              {isSubmitting ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 rounded-2xl ">
        <table className="table-auto md:table-fixed border-collapse border border-gray-800 w-full rounded-2xl">
          <thead>
            <tr>
              <th className="w-2/3 border border-gray-400 px-4 py-2 text-left">
                Skill Details
              </th>
              <th className="w-1/3 border border-gray-400 px-4 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill._id} className="hover:bg-gray-100">
                <td className="border border-gray-400 px-4 py-2">
                  <p>
                    {" "}
                    <strong>Skill:- </strong>
                    {skill.skillName}
                  </p>
                  <p>
                    <strong>Proficiency:- </strong> {skill.level}%
                  </p>
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    className="bg-red-600 p-2 rounded-xl"
                    onClick={() => {
                      handleDelete(skill._id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="ml-4 bg-blue-600 p-2 rounded-xl w-16"
                    onClick={() => {
                      handleEdit(skill);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddSkills;
