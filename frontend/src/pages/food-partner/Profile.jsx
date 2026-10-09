import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFoodPartnerData } from "../../redux/foodSlice";
import { useState } from "react";
import dp from "../../../public/dummyDp.png"

const videos = Array.from({ length: 9 });

const Profile = () => {
  const { id } = useParams()
  console.log("partner id")
  console.log(id)
  const dispatch = useDispatch()
  const {foodPartnerData}=useSelector((state)=>state.foodSlice)
  const [videos,setVideos]=useState([])

  useEffect(()=>{
  setVideos(foodPartnerData?.foods)

  },[foodPartnerData])

  console.log("videos")
  console.log(videos)

  console.log("foodPartnerData")
  console.log(foodPartnerData)

  useEffect(() => {
    dispatch(getFoodPartnerData(id)).unwrap().then((res) => {
      console.log("res food partner")
      console.log(res)
    }).catch((er) => {
      console.log("food partner error")
      console.log(er)
    })
  }, [])
return (
  <div className="min-h-screen flex justify-center px-3 py-6">
    <div className="w-full max-w-sm">

      {/* Header */}
      <div className="rounded border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-3">

        <div className="flex gap-4 items-center ">

          {/* Profile */}
          <div className="h-15 w-15 rounded-full overflow-hidden border-2 border-white/20 bg-zinc-800">
            <img
              src={dp}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white">
              {foodPartnerData?.businnessName}
            </h2>
            <p className="text-xs">{foodPartnerData?.name}</p>

            <p className="mt-1 text-xs text-gray-300">
              📍 {foodPartnerData?.fullAddress}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-white/5 border border-white/10 py-3 text-center">
            <p className="text-xs text-gray-400">Total Meals</p>
            <h3 className="text-xl font-bold text-white">43</h3>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 py-3 text-center">
            <p className="text-xs text-gray-400">Customers Served</p>
            <h3 className="text-xl font-bold text-white">15K</h3>
          </div>

        </div>
      </div>

      {/* Videos */}
      <div className=" grid grid-cols-3 mt-1 gap-0.5">
        {videos?.map((vid, index) => (
          <div
            key={index}
            className="aspect-9/16 overflow-hidden"
          >
            <video
              muted
              preload="metadata"
              playsInline
              className="h-full w-full object-cover"
            >
              <source src={vid?.video}
              muted
              />
            </video>
          </div>
        ))}
      </div>

    </div>
  </div>
);
};

export default Profile;