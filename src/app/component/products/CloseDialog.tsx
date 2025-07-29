import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
// import { Button } from '@mui/material'

interface props {
  id: number;
  removeProduct: (id: number) => void;
}
export default function CloseDialog({ removeProduct, id }: props) {
  return (
    <Dialog>
      <DialogTrigger>
        <DialogTitle>
          <Trash />
        </DialogTitle>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription>هل أنت متأكد من حذف هذا المنتج؟</DialogDescription>
        <div className="flex gap-4 justify-start">
          <button
            className="bg-red-700 text-lg text-white px-3 rounded-lg hover:opacity-80 transition-all ease-out duration-300 "
            onClick={() => removeProduct(id)}
          >
            موافق{" "}
          </button>
          <DialogClose className="hover:border hover:border-[#1e1e1e1] hover:px-4 hover:rounded-lg  transition-all ease-out duration-300">
            إلغاء
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
