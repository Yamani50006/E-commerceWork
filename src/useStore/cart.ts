import { create } from 'zustand'

type Cartstype={
    id:number,
    title:string,
    price:number,
    description:string,
    category:string,
    image:string,
    rating:{
        rate:number,
        count:number
    }
}
interface CartState {
  Carts:number[]; 
  addCart:(item:number)=>void;
  removeCart:(id:number)=>void;
  clearCart:()=>void;
  
}

export  const useCartStore = create<CartState>()((set) => ({
  Carts: [],
  addCart:((item)=>{
    set((state)=>({
        Carts:[...state.Carts,item]
    }))
  }),
  removeCart:((id)=>{
    set((state)=>({
      Carts:state.Carts.filter((item)=>item!==id)
    }))
  }),

  clearCart:()=>set((state)=>({
    Carts:[]
  }))
    }))
  

