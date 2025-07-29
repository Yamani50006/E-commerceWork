"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { addToCart, removeFromCart } from "@/lib/cart/cartUtils";
import { useRouter } from "next/navigation";

import EddingForm from "@/app/component/products/EdingProductForm";
import { toast } from "sonner";
import { IProduct } from "@/lib/types";
// import CloseDialog from "@/app/component/products/CloseDialog";

export default function Page() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState<IProduct | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  function editingCard(id: number, product: IProduct) {
    setProduct((pro) =>
      pro?.id == id
        ? {
            ...pro,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
          }
        : pro
    );
  }

  if (!product)
    return (
      <div className="text-center h-screen flex justify-center items-center text-2xl font-bold">
        جاري التحميل...
      </div>
    );

  return (
    <section className="w-full  max-h-screen    ">
      <div className="grid grid-cols-1 md:grid-cols-2 backdrop-blur-md shadow-xl px-3 py-1 gap-2 mt-10 items-center rounded-md ">
        <div className="w-80 mx-auto  ">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className=" h-[400px] w-[400px] lg:h-[500px] lg:w-[500px] object-contain"
          />
        </div>

        <div className="px-2 lg:px-4 py-2">
          <h2 className="text-sm lg:text-lg font-medium mb-4 ">
            {product.title}
          </h2>
          <p className="text-sm text-gray-400  mb-2 whitespace-pre-wrap  ">
            {product.description}
          </p>
          <div className="flex  gap-4">
            <p className="text-sm font-bold">{product.price}$</p>

            <span>
              {Array.from({ length: 5 }).map((_, i) => {
                return (
                  <span
                    key={i}
                    className={`${i < product.rating.rate ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    ★
                  </span>
                );
              })}
            </span>
          </div>
          <div className="btn flex gap-4 mt-10">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              onClick={() => {
                addToCart(product.id);
                toast.success("تم اضافه المنتج الي السلة بنجاح");
              }}
            >
              إضافة للسلة
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              onClick={() => {
                removeFromCart(product.id);
                router.push("/products");
              }}
            >
              حذف
            </button>
            <EddingForm product={product} editingCard={editingCard} />
            {/* <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
          تعديل
        </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

