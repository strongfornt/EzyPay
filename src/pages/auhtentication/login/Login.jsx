import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useAuth from "../../../hook/useAuth";

export default function Login() {
  const { setIsUserExist, getUser } = useAuth();
  const [errors, setErrors] = useState({ pin: "", contact: "" });
  const axiosPublic = useAxiosPublic();
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation pattern start ===============================
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const mobilePattern = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10,13}$/;
    //validation pattern end ===============================

    const form = e.target;
    const emailOrNumber = form.email.value;
    const pin = form.pin.value;

    if (!/^\d{5}$/.test(pin)) {
      setErrors({
        ...errors,
        contact: "",
        pin: "Please enter a 5-digit PIN",
      });
      return;
    }

    if (
      !emailPattern.test(emailOrNumber) &&
      !mobilePattern.test(emailOrNumber)
    ) {
      setErrors({
        ...errors,
        contact: "Please enter a valid mobile number or email address",
        pin: "",
      });

      return;
    }

    setErrors({ contact: "", pin: "" });

    const userInfo = {
      userId: emailOrNumber,
      pin,
    };

    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    // setIsUserExist(userInfo)
    await getUser(userInfo)
   
  };



  return (
    <section className=" min-h-screen flex items-center ">
      <div className="w-full max-w-sm mx-auto overflow-hidden  rounded-lg  ">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>

          <h3 className="mt-3 text-xl font-medium text-center text-gray-700 ">
            Welcome Back
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500  border rounded-lg  dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                name="email"
                placeholder="Mobile Number Email Address"
                aria-label="Mobile Number Email Address"
                pattern="^(\+?\d{1,4}[\s-]?)?(?!0+\s*,?$)\d{10,13}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                required
              />
              {errors?.contact && (
                <span className="text-xs text-red-500">{errors?.contact}</span>
              )}
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500  border rounded-lg  dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                name="pin"
                placeholder="Enter a 5-digit PIN"
                aria-label="Pin"
                // pattern="\d{4,6}"
                required
              />
              {errors?.pin && (
                <span className="text-xs text-red-500">{errors?.pin}</span>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 w-full "
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center ">
          <span className="text-sm text-gray-700">
            Don&apos;t have an account?{" "}
          </span>

          <Link
            to="/register"
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
