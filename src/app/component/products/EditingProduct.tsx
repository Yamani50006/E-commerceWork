// "use client"

// import { useState } from "react";

// interface Product{
//     id: number;
//     title: string;
// }
// export function EditProductForm({ product, onEdit }: { product:Product ; onEdit: (id: number, title: string) => void }) {
//   const [editing, setEditing] = useState(false);
//   const [title, setTitle] = useState(product.title);

//   return editing ? (
//     <div>
//       <input value={title} onChange={e => setTitle(e.target.value)} />
//       <button onClick={() => { onEdit(product.id, title); setEditing(false); }}>حفظ</button>
//       <button onClick={() => setEditing(false)}>إلغاء</button>
//     </div>
//   ) : (
//     <button onClick={() => setEditing(true)}>تعديل</button>
//   );
// }