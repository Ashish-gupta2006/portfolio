import { useForm } from "react-hook-form";
import axios from "axios";
import {toast} from 'react-toastify'
import { useState, useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProfileData = () => {
  const[profileData,setProfileData]=useState(null);
  const[id,setId]=useState(null);
  const[editPofile,setEditProfile]=useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
     
      if (editPofile) {
        // ✅ FormData object create
        const formData = new FormData();
        formData.append("adminName", data.adminName);
        formData.append("profession", data.profession);
        formData.append("about", data.about);
        formData.append("image", data.image[0]); // file

        const response = await axios.put(
          `${BACKEND_URL}/admin/profile/${id}`,
          formData,
          { withCredentials: true }
        );
        toast.success(response.data.message);
        setEditProfile(false);
        reset({
          adminName: "",
          profession: "",
          about: "",
        });
        fetchProfileData();
      } else {
        // ✅ FormData object create
        const formData = new FormData();
        formData.append("adminName", data.adminName);
        formData.append("profession", data.profession);
        formData.append("about", data.about);
        formData.append("image", data.image[0]); // file

        const response = await axios.post(
          `${BACKEND_URL}/admin/profile`,
          formData,
          { withCredentials: true }
        );
        toast.success(response.data.message);
        reset({
          adminName: "",
          profession: "",
          about: "",
        });
        fetchProfileData();
        setEditProfile(false);
      }
      
    } catch (error) {
      if (error.response?.data?.errors) {
        toast.error(error.response.data.errors);
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/portfolio/user`, {
        withCredentials: true,
      }); 
      setProfileData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("Error fetching profile data");
    }
  };

  const handelEdit = (data) => {
    setEditProfile(true);
    setId(data._id);  
    reset({
      adminName: data.adminName,
      profession: data.profession,
      about: data.about,
    }); 
  }

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="min-h-screen  bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-6">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Complete Your Profile
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Admin Name */}
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              {...register("adminName", {
                required: "Name is required",
              })}
            />
            {errors.adminName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.adminName.message}
              </p>
            )}
          </div>

          {/* Profession */}
          <div>
            <input
              type="text"
              placeholder="Enter your profession"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              {...register("profession", {
                required: "Profession is required",
              })}
            />
            {errors.profession && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profession.message}
              </p>
            )}
          </div>

          {/* About Section */}
          <div>
            <textarea
              placeholder="Write something about yourself"
              className="w-full border rounded-lg p-3 h-28 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              {...register("about", {
                required: "About is required",
              })}
            ></textarea>
            {errors.about && (
              <p className="text-red-500 text-sm mt-1">
                {errors.about.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              {...register("image", {
                required: "Image is required",
              })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-1/2 py-3 rounded-lg text-white font-semibold transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 mt-10">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          Current Profile Data
        </h2>
        {profileData ? (
          <div className="space-y-4">
            <p> <strong>Name:</strong> {profileData.adminName}</p>
            <p> <strong>Profession:</strong> {profileData.profession}</p>
            <p> <strong>About:</strong> {profileData.about}</p> 

            {profileData.image.url && (
              <div>
                <strong>Profile Image:</strong>
                <img
                  src={profileData.image.url}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full mt-2"
                />
              </div>  
            )}
            <button type="submit" className="p-3 mt-5 rounded-lg text-center bg-blue-500" onClick={()=>{handelEdit(profileData)}}>Edit</button>
          </div>
        ) : (
          <p className="text-center text-gray-500">No profile data available.</p>
        )}  

      </div>
    </div>
  );
};

export default ProfileData;
