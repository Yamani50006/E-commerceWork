"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import { ShoppingBag, Contact } from "lucide-react";
import CloseDialog from "./CloseDialog";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { IProduct } from "@/lib/types"
import { motion } from "framer-motion"
interface ProductCardProps {
  id: number;
  addToCart: (id: number) => void;
  removeProduct: (id: number) => void;
  product: IProduct;
}

export default function ProductCard({
  addToCart,
  removeProduct,
  product,
}: ProductCardProps) {
    const router = useRouter();
   

  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} >
    <Card className="w-64 h-94 relative" >
      <CardHeader className="flex justify-center items-center">
        <Image
          src={product.image}
          width={80}
          height={80}
          alt={product.title}
          className=" object-cover rounded-lg"
          
        />
      </CardHeader>
      <CardContent className="flex items-center  flex-col gap-2  px-3 ">
        <h3 className="px-4 w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {product.title}
        </h3>

        <div className="mt-10 flex justify-between items-center w-full absolute bottom-[70px] px-4">
          <p>{product.price} $</p>
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < product.rating.rate ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="absolute bottom-4 flex gap-4">
        <button
          className="cursor-pointer"
          onClick={() => {
            addToCart(product.id);
            toast.success("تم اضافه المنتج الي السلة بنجاح");
          }}
        >
          <ShoppingBag />{" "}
        </button>
        <button
          className="cursor-pointer"
          onClick={() => {
           router.push(`/products/${product.id}?product=${JSON.stringify(product)}`)
          }}
        >
          <Contact />
        </button>
        <CloseDialog removeProduct={removeProduct} id={product.id} />
      </CardFooter>
    </Card>
    </motion.div>
  );
}

