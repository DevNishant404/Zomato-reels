import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { foodPartnerRegistration } from "../../redux/authSlice";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  businnessName: "",
  businessConatact: "",
  password: "",
  fullAddress:""
};

const FoodPartnerRegister = () => {
   const dispatch = useDispatch()
  const navigate=useNavigate()
  const [foodPartnerData, setFoodPartnerData] = useState(initialState);

  function handleOnChange(e) {
    const { name, value } = e.target;

    setFoodPartnerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    console.log(foodPartnerData);

    dispatch(foodPartnerRegistration(foodPartnerData)).unwrap().then((res)=>{
      console.log("food partner registration res")
      console.log(res)
      if(res.status===201){
        toast.success("Registration done successfully")
        navigate("/create-food")
      }
    }).catch((er)=>{
      console.log("food partner eroor")
      console.log(er)
      toast.error(er.data.message)
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-3">
      <div className="w-full max-w-md rounded-3xl sm:border border-white/10 sm:bg-white/5 sm:p-4 sm:shadow-2xl backdrop-blur-xl">

        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-white">
            Partner  Registration
          </h1>

          <p className=" text-sm text-gray-400 text-center">
            Register your restaurant and start receiving online orders.
          </p>
          <Link to={"/user/register"} className="text-xs mt-2 text-orange-400 hover:text-orange-300 underline">Register as a user</Link>
        </div>

        <form onSubmit={handleOnSubmit} className="mt-8 grid gap-1 sm:grid-cols-2  space-y-5">
          {/* Name */}
          <div className="col-span-2">
            <label className="mb-0.5 block text-sm font-medium text-gray-300">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={foodPartnerData.name}
              onChange={handleOnChange}
              placeholder=" Owner Name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-1 col-span-2">
            <label className="mb-0.5 block text-sm font-medium text-gray-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={foodPartnerData.email}
              onChange={handleOnChange}
              placeholder="partner@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          <div className="sm:col-span-1 col-span-2">
            <label className="mb-0.5 block text-sm font-medium text-gray-300">
              Business Name
            </label>

            <input
              type="text"
              name="businnessName"
              value={foodPartnerData.businnessName}
              onChange={handleOnChange}
              placeholder="Business name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          <div className="sm:col-span-1 col-span-2">
            <label className="mb-0.5 block text-sm font-medium text-gray-300">
              Business Contact
            </label>

            <input
              type="text"
              name="businessConatact"
              value={foodPartnerData.businessConatact}
              onChange={handleOnChange}
              placeholder="Business contact.."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>
                    <div className="sm:col-span-1 col-span-2">
            <label className="mb-0.5 block text-sm font-medium text-gray-300">
              Full Address
            </label>

            <input
              type="text"
              name="fullAddress"
              value={foodPartnerData.fullAddress}
              onChange={handleOnChange}
              placeholder="e.g, Vibhutikhand sector 3 gomtinar, Lucknow.."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>


          {/* Password */}
          <div className="col-span-2">
            <label className="mb-0.5 block text-sm font-medium text-gray-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={foodPartnerData.password}
              onChange={handleOnChange}
              placeholder="••••••••"
              className="min-w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          <button
            type="submit"
            className="w-full col-span-2 cursor-pointer rounded-xl bg-linear-to-r from-orange-500 to-red-500 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
          >
            Register as Food Partner
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already registered?{" "}
          <Link
            to="/food-partner/login"
            className="font-medium text-orange-400 hover:text-orange-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;