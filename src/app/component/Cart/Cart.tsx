"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
 
} from "@/components/ui/sheet";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { clearCart } from "@/lib/cart/cartUtils";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { IProduct } from "@/lib/types";
import { Monitor, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/useStore/cart";
import ProductCard from "../products/ProductCard";

export function Cart() {
  // const [count, setCount] = React.useState<number>(0);
  const {Carts,removeCart,clearCart}=useCartStore();
  const [cart, setCart] = React.useState<number[]>([]);
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const router = useRouter();

  //fetch products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);


  //get cart from localStorage
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const stored = localStorage.getItem("cart");
  //     if (stored) setCart(JSON.parse(stored));
  //     else setCart([]);
  //   }
  // }, []);

 

  // المنتجات الموجودة في السلة
  const cartProducts = products.filter((p) =>Carts.includes(p.id));

  const handelRemove=(id:number)=>{
    removeCart(id);
    setCart(Carts);
  }

  
  const handelClearCarts=()=>{
    clearCart();
  }

  const totalCarts=()=>{
    return Carts.length;
  }

  const totalPrice=()=>{
    return Carts.reduce((sum,id)=>{
      const product=products.find((p)=>p.id===id);
      if(product){
        return sum+product.price;
      }
      return sum;
     
    },0)


  }

  // حساب الإجمالي
  // const totalPrice = useCallback(() => {
  //   return cartProducts.reduce((sum, p) => sum + p.price, 0);
  // }, [cartProducts]);

  // عدد المنتجات في السلة
// const countCart = useCallback(() => {
//   return cartProducts.reduce((sum) => sum + 1, 0);
// },[cartProducts])

  // حذف منتج من السلة
  // const handleRemoveFromCart = useCallback((id: number) => {
  //   const updated = cart.filter((pid) => pid !== id);
  //   setCart(updated);
  //   localStorage.setItem("cart", JSON.stringify(updated));
  // }, [cart]);

  // حذف كل المنتجات من السلة
  // const handleClearCart = useCallback(() => {
  //   setCart([]);
  //   localStorage.setItem("cart", JSON.stringify([]));
  //   clearCart();
  // }, []);

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  if (!cart) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={totalCarts()||0} color="primary">
            <ShoppingCartIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300" />
          </StyledBadge>
        </IconButton>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart item</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        

        
        <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-scroll">
          <div className="grid gap-3 ">
            {cartProducts.map((item, index) => (
              <div
                key={index}
                className="flex items-center max-w-full border-b border-gray-100 py-4 "
              >
                <div className="flex items-center justify-between w-full px-4">
                  <Image
                    src={item.image}
                    width={80}
                    height={80}
                    alt={item.title}
                    style={{ height: 'auto' }}
                  />
                  <div className="flex flex-col gap-2 ">
                    <h3 className="px-4 w-40 overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                      {item.title}
                    </h3>
                    <div className="flex w-full justify-between items-center gap-2 mt-10">
                      <p className="text-sm text-gray-600 text-rigth">
                        {item.price}$
                      </p>
                      <div className="flex gap-2">
                        <Trash size={20} className="cursor-pointer text-red-500 hover:scale-3d hover:text-red-600 transition-all" onClick={() =>handelRemove(item.id) } />
                        <Monitor size={20} onClick={() => { 
                          router.push(`/products/${item.id}?product=${JSON.stringify(item)}`)
                        }}  />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
       
        <SheetFooter>
          <div className="flex justify-between w-full px-4 py-4 items-center border-t border-gray-200 mb-10">
            <span>الاجمالي</span>
            <span className="text-lg font-bold">{totalPrice()}$</span>
          </div>
         
            <Button  onClick={()=>handelClearCarts()} >حذف الكل</Button>
         
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
