import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const Contact = () => {
  const validateSchema = Yup.object({
    senderName: Yup.string()
      .required("Name is required")
      .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be less than 30 characters"),

    email: Yup.string()
      .required("Email is required")
      .matches(
        /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Enter a valid email address"
      ),

    message: Yup.string()
      .required("Message is required")
      .matches(/^[A-Za-z0-9.,?!'"\s-]+$/, "Only valid characters are allowed")
      .min(20, "Message must be at least 20 characters"),
  });

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/user/message`, data);
      alert(response.data.message);
      reset();
      clearErrors();
    } catch (error) {
      console.log("error sending message: ", error);
      if (error.response?.data?.errors) {
        alert(error.response.data.errors.join(", "));
      } else {
        alert(error.response?.data?.message || "something went worng");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Contact Me</h1>
        <div className="w-28 h-1 bg-blue-500 mx-auto mt-2 rounded-lg"></div>
        <p className="mt-3 text-gray-600 text-center">
          I'd love to hear from you! Whether you have a question or just want to
          say hello.
        </p>
      </div>

      {/* Contact Info and Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Details */}
        <div className="space-y-4 hidden md:block ">
          <p className="text-lg font-medium text-gray-800">
            Email:
            <span className="text-blue-700">ashishgupta.dev@gmail.com</span>
          </p>

          <p className="text-lg font-medium text-gray-800">
            Location: <span className="text-blue-700">Lucknow, India</span>
          </p>

          {/* Social Links */}
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-800">Follow Me</h2>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://github.com/Ashish-gupta2006/"
                target="_blank"
                className="hover:text-blue-600 text-2xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/ashish-gupta2006/"
                target="_blank"
                className="hover:text-blue-600 text-2xl"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter your  name"
            className="w-full p-3 border rounded-lg translate-x-0 focus:ring-8 focus:ring-blue-400 focus:outline-none "
            {...register("senderName")}
          />
          {errors.senderName && (
            <p className="ps-4 mt-2 text-sm text-red-600">
              {errors.senderName.message}
            </p>
          )}
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border p-3 rounded-lg translate-x-0 focus:ring-8 focus:ring-blue-400 focus:outline-none"
            {...register("email")}
          />
          {errors.email && (
            <p className="ps-4 mt-2 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
          <textarea
            placeholder="Your Message"
            className="w-full border p-3 rounded-lg focus:ring-8 focus:ring-blue-400 focus:outline-none h-40"
            {...register("message")}
          ></textarea>
          {errors.message && (
            <p className="mt-2 ps-4 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
          <button
            disabled={isSubmitting}
            type="submit"
            className={`md:w-40  w-full md:ms-52 text-white py-2 text-center rounded-lg  transition ${
              isSubmitting
                ? "bg-slate-200  cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
