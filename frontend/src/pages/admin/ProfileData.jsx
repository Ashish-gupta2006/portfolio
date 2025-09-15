import { useForm } from "react-hook-form";
import axios from "axios";
import Home from '../Home'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProfileData = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // ✅ FormData object create
      const formData = new FormData();
      formData.append("adminName", data.adminName);
      formData.append("profession", data.profession);
      formData.append("about", data.about);
      formData.append("image", data.image[0]); // file

      // ✅ Axios request (no need to set Content-Type manually)
      const response = await axios.post(
        `${BACKEND_URL}/admin/profile`,
        formData
      );

      alert(response.data.message);
      reset();
    } catch (error) {
      if (error.response?.data?.errors) {
        alert(error.response.data.errors);
      } else {
        alert(error.response?.data?.message || "Something went wrong");
      }
    }
  };

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
      <Home/>
    </div>
  );
};

export default ProfileData;
