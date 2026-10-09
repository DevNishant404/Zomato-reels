import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFood } from "../../redux/foodSlice";

const initialState = {
  name: "",
  description: "",
  video: null,
};

const CreateFood = () => {
  const [foodData, setFoodData] = useState(initialState);
  const dispatch=useDispatch()
  function handleOnChange(e) {
    const { name, value, files } = e.target;

    if (name === "video") {
      setFoodData((prev) => ({
        ...prev,
        video: files[0],
      }));
    } else {
      setFoodData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", foodData.name);
    formData.append("description", foodData.description);
    formData.append("video", foodData.video);

    console.log(foodData);
         dispatch(createFood(formData)).unwrap().then((res)=>{
      console.log("creating food response")
      console.log(res)
    }).catch((er)=>{
      console.log("creating food error")
      console.log(er)
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-bold text-white">
          Create Food Reel
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Upload a food video to showcase your delicious meals.
        </p>

        <form onSubmit={handleOnSubmit} className="mt-8 space-y-5">
          {/* Food Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Food Name
            </label>

            <input
              type="text"
              name="name"
              value={foodData.name}
              onChange={handleOnChange}
              placeholder="e.g. Chicken Biryani"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          {/* Video */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Upload Video
            </label>

            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleOnChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-white hover:file:bg-orange-600"
            />

            {foodData.video && (
              <p className="mt-2 text-xs text-gray-400">
                {foodData.video.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={foodData.description}
              onChange={handleOnChange}
              placeholder="Write something about this dish..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-linear-to-r from-orange-500 to-red-500 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
          >
            Upload Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;