import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getFood, likeFoodReel } from "../../redux/foodSlice";
import {Bookmark, Heart} from "lucide-react"



const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const videoRefs = useRef([]);
  const { foodItems } = useSelector((state) => state.foodSlice)

  const [likeCount,setLikeCount]=useState(0)

  useEffect(() => {
    console.log("useeffect")
    dispatch(getFood()).unwrap().then((res) => {
      console.log("create food res")
      console.log(res)
    }).catch((er) => {
      console.log("food create errr")
      console.log(er)
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [foodItems]);


const likeReel = async (reel) => {
   const payload={
    foodId:reel._id
   }

   dispatch(likeFoodReel(payload)).unwrap().then((res)=>{
    console.log("like count res")
    console.log(res)
    if(res){
      dispatch(getFood())
    }
   }).catch((er)=>{
    console.log("food like error")
    console.log(er)
   })

    return
};


  return (
    <div className="h-screen overflow-y-scroll flex flex-col items-center snap-y snap-mandatory scrollbar-hide">
      {foodItems?.map((reel,index) => (
        <section
          key={reel?._id}
          className="relative min-h-full  w-sm snap-start overflow-hidden bg-black"
        >
          {/* Video  */}
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={reel.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />


          {/* Dark Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-8 left-5 z-10 max-w-md text-white">
            <h2 className="text-3xl font-bold">{reel?.name}</h2>
            <p className="mt-2 text-sm text-gray-200">
              {reel?.description}
            </p>
            <Link to={`/food-partner/${reel?.foodPartner?._id}`}>
              <button className=" bg-blue-600 rounded cursor-pointer w-full px-5 py-1">Visit store</button>
            </Link>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent">
          <div className=" h-full flex flex-col  items-end justify-center relative w-full">
            <div className="flex flex-col text-xs absolute items-center mr-3 bottom-40  justify-center">
              <button onClick={()=>likeReel(reel)} className="cursor-pointer"><Heart /></button>
              <span>{reel.likeCount||0}</span>
            </div>
            <div className="flex flex-col text-xs absolute mr-3 bottom-27 items-center  justify-center">
              <button className="cursor-pointer"><Bookmark /></button>
              <span>60</span>
            </div>
          </div>
          </div>


        </section>
      ))}
    </div>
  );
};

export default Home;