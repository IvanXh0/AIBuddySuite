"use client";
import Lottie from "lottie-react";
import animationData from "../public/text-animation.json";

export default function HomeAnimation() {
  return (
    <div className="flex flex-col items-center mt-14 max-w-3xl ">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
