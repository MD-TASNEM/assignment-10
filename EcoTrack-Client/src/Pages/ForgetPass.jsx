import React, { use } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const ForgetPass = () => {
  const { forgetpass } = use(AuthContext);
  const { state } = useLocation();

  const { email } = state;
  const handleForgetPass = (e) => {
    e.preventDefault();
    forgetpass(email)
      .then(() => {
        toast.success("Send to Your Email");
        window.open("https://mail.google.com", "_blank");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-2 sm:mt-4 mb-10">
        <div className="text-center">
          <h1 className="text-4xl my-2">Update Password</h1>
          <h1>Please enter your e-mail and password:</h1>
        </div>

        <div className="mt-5">
          <form>
            <fieldset className="fieldset">
              {/* Email Field */}

              <label className="label">Email:</label>
              <input
                type="email"
                value={email}
                readOnly
                defaultValue={email}
                className="input sm:w-[400px] sm:h-[50px] border-2 border-gray-400 focus:outline-none"
                placeholder="Your email"
              />

              <button
                onClick={handleForgetPass}
                className="btn btn-neutral mt-3 sm:w-[400px] border-none relative group"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Click here
                </span>
                <span className="absolute bg-white w-0 h-full right-0 transition-all duration-300  group-hover:w-full group-hover:text-black "></span>
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
