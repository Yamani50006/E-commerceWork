"use client"
import React, { useEffect, useState } from 'react';
import { getCart, addToCart as addToCartUtil } from '../../lib/cart/cartUtils';
import Hero from '../component/products/hero';
import ProductCard from '../component/products/ProductCard';
import { IProduct } from '@/lib/types';
import { useCartStore } from '@/useStore/cart';
export default function ProductsPage() {
 const {addCart}=useCartStore();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<number[]>([]);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      });
    setCart(getCart());
  
  }, []);


  useEffect(() => {
    let result = products;
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  }, [search, products, category]);

  const addToCart = (id: number) => {
    addToCartUtil(id);
    setCart(getCart());
    addCart(id);
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    setFiltered(filtered.filter(p => p.id !== id));
  };

  return (
    <div className='px-4 py-2 grid-cols-1  lg:grid-cols-4 gap-4  ' >
      <Hero />
      <div className='grid grid-cols-1 lg:grid-cols-2  items-center mb-10 gap-10 '>
     
        <div className="flex flex-wrap justify-center items-center gap-3 ">
          <button onClick={() => setCategory('all')} className={`px-4 py-2 rounded ${category==='all'?'bg-blue-500 text-white':'bg-gray-200'}`}>الكل</button>
          <button onClick={() => setCategory("men's clothing")} className={`px-4 py-2 rounded ${category==="men's clothing"?'bg-blue-500 text-white':'bg-gray-200'}`}>ملابس رجالية</button>
          <button onClick={() => setCategory("women's clothing")} className={`px-4 py-2 rounded ${category==="women's clothing"?'bg-blue-500 text-white':'bg-gray-200'}`}>ملابس نسائية</button>
          <button onClick={() => setCategory("jewelery")} className={`px-4 py-2 rounded ${category==="jewelery"?'bg-blue-500 text-white':'bg-gray-200'}`}>إكسسوارات</button>
          <button onClick={() => setCategory("electronics")} className={`px-4 py-2 rounded ${category==="electronics"?'bg-blue-500 text-white':'bg-gray-200'}`}>إلكترونيات</button>
        </div>
        <input
          type="text"
          placeholder="بحث عن منتج..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='border border-gray-300 p-2 px-1 sm:px-4 lg:px-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      </div>
      
      {/* <Link href="/cart" style={{ float: 'left', marginBottom: 16 }}>
        السلة ({cart.length})
      </Link> */}

      <div  className='grid grid-cols-1 px-12  sm:grid-cols-2   md:grid-cols-3  lg:grid-cols-4  w-full gap-5 justify-center  '>
         {filtered.map(product => (
          <div key={product.id}>
          <ProductCard   id={product.id} product={product} addToCart={addToCart} removeProduct={removeProduct} />
        </div> 
      )
      )}
      {
        filtered.length === 0 &&(
           <div className='text-center  flex justify-center w-full   text-2xl font-bold mt-16' >
            <h1 className='text-black text-2xl font-bold' >لا يوجد منتجات</h1>
          </div>
        )
      }
      </div>
    </div>
  );
        
}


