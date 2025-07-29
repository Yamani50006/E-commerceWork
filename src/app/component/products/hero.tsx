import React from "react";
import Image from "next/image";
import ph from "../../../../public/images/2.png";
export default function Hero() {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center flex h-64  items-center justify-center overflow-clip  mb-20">
      
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-500">مرحبًا بكم في متجرنا</h1>
          <p className="text-gray-700 mb-6">
            استمتع بتجربة تسوق فريدة من نوعها مع مجموعة واسعة من المنتجات عالية
            الجودة.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            استعرض المنتجات
          </button>
        </div>

<div className="w-full flex justify-center items-center ">
 <Image
          src={ph}
          alt="Store Logo"
          className=" h-[500px] w-[500px] lg:h-[600px] lg:w-[600px]   "
        />
</div>
         
      </div>

  );
}
