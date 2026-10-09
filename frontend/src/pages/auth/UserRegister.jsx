import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/authSlice";
import { toast } from "react-toastify";


const initialState = {
  fullname: "",
  email: "",
  password: ""
}

const UserRegister = () => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const [userRegisterData, setUserRegisterData] = useState(initialState)



  function handleOnchange(e) {

    const { name, value } = e.target


    setUserRegisterData({
      ...userRegisterData,
      [name]: value
    })

  }

  function handleOnSubmit(e) {
    e.preventDefault()

    dispatch(registerUser(userRegisterData)).unwrap().then((res) => {
      console.log("res user registration")
      console.log(res)
      if (res.status === 201) {
        toast.success(res.data.message)
        navigate("/")

      }
    }).catch((er) => {
      console.log("user registration err")
      console.log(er)
      if (er) {
        console.log(er)
        toast.error(er.data.message)
      }
    })

  }






  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-sm text-gray-400">
            Join us and start ordering your favorite food.
          </p>
          <Link to={"/food-partner/register"} className="text-xs mt-2 text-orange-400 hover:text-orange-300 underline">Register as Food partner</Link>
        </div>


        <form onSubmit={handleOnSubmit} className="mt-8 space-y-5">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              name="fullname"
              onChange={handleOnchange}
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleOnchange}
              placeholder="john@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleOnchange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl cursor-pointer bg-linear-to-r from-orange-500 to-red-500 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={"/user/login"}>
            <button
              type="button"
              className="font-medium cursor-pointer text-orange-400 hover:text-orange-300"
            >
              Sign In
            </button>
          </Link>

        </p>
      </div>
    </div>
  );
};

export default UserRegister;