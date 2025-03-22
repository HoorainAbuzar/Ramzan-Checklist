import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    message: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Successful submission, navigate to your page
        navigate("/dua");
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-green-200 to-green-600">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3"></h2>

        <form
          action="https://formspree.io/f/xldjdbnn"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C] flex items-center gap-3">
            <input
              className="bg-transparent outline-none "
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C] flex items-center gap-3">
            <input
              className="bg-transparent outline-none "
              type="text"
              name="address"
              placeholder="Address"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C] flex items-center gap-3">
            <input
              className="bg-transparent outline-none "
              type="text"
              name="message"
              placeholder="Message"
              required
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="text-white font-medium w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900"
          >
            Send
          </button>
          <button
            onClick={() => navigate("/dua")}
            type="submit"
            className="text-white font-medium w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900"
          >
            Skip
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
