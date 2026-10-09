import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/authSlice";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const UserLogin = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [loginData, setLoginData] = useState(initialState);

  function handleOnChange(e) {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    console.log(loginData);
    dispatch(userLogin(loginData)).unwrap().then((res)=>{
      console.log("user login res")
      console.log(res)
      if(res.status===200){
        toast.success("Logged In Successfully")
        navigate("/")
      }
    }).catch((er)=>{
      console.log("user login error")
      console.log(er)
      if(er){
        toast.error(er.data.message)
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

        <p className="mt-2 text-sm text-gray-400">
          Sign in to continue to your account.
        </p>

        <form onSubmit={handleOnSubmit} className="mt-8 space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleOnChange}
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
              value={loginData.password}
              onChange={handleOnChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-linear-to-r from-orange-500 to-red-500 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/user/register"
            className="font-medium text-orange-400 transition hover:text-orange-300"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;