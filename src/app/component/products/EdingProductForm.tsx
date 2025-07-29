"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IProduct } from "@/lib/types";

// interface product {
//   id: number;
//   title: string;
//   price: string;
//   description: string;
//   category: string;
//   image: string;
// }
export default function EddingForm({
  product,
  editingCard,
}: {
  product: IProduct;
  editingCard: (id: number, product: IProduct) => void;
}) {
  const [editForm, setAdditForm] = useState({
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });
  useEffect(() => {
    setAdditForm({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      id: product.id,
    });
  }, [product]);

 
  return (
    <Dialog>
      <DialogTrigger className="bg-green-500 text-white px-4 py-1 rounded">تعديل</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل المنتج</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="اسم المنتج"
          value={editForm.title}
          onChange={(e) => setAdditForm({ ...editForm, title: e.target.value })}
        />
        <Textarea
          placeholder="وصف المنتج"
          value={editForm.description}
          onChange={(e) =>
            setAdditForm({ ...editForm, description: e.target.value })
          }
        />
        <Input
          type="number"
          placeholder="سعر المنتج"
          value={editForm.price}
          onChange={(e) => setAdditForm({ ...editForm, price: Number(e.target.value) })}
        />

        <DialogFooter>
          <DialogClose
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-300 transition-transform ease-in duration-300 "
            onClick={() => {
              editingCard(product.id, { ...editForm, rating: product.rating });
            }}
          >
            حفظ
          </DialogClose>
          <DialogClose className=" text-black  px-4 py-1 rounded hover:border transition-transform ease-in duration-300 ">
            الغاء
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
