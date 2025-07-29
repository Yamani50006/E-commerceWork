// cartUtils.ts
// أدوات بسيطة لإدارة السلة باستخدام localStorage


export function getCart(): number[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('cart');
  return stored ? JSON.parse(stored) : [];
}

export function addToCart(id: number) {
  const cart = getCart();
  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

export function removeFromCart(id: number) {
  const cart = getCart().filter(pid => pid !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function clearCart() {
  localStorage.removeItem('cart');
 
}

export function getCartCount() {
  return getCart().length;
}