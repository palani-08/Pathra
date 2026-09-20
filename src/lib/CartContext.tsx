import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { CartItem, CartState } from './cart'
import { addItem, cartCount, cartTotal, clearCart, emptyCart, loadCart, removeItem, saveCart, updateQty } from './cart'

type CartContextValue = {
  cart: CartState
  count: number
  total: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(emptyCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setCart(loadCart())
  }, [])

  useEffect(() => {
    if (cart.updatedAt > 0) saveCart(cart)
  }, [cart])

  const value: CartContextValue = {
    cart,
    count: cartCount(cart),
    total: cartTotal(cart),
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    add: (item, qty = 1) => setCart((c) => addItem(c, item, qty)),
    setQty: (key, qty) => setCart((c) => updateQty(c, key, qty)),
    remove: (key) => setCart((c) => removeItem(c, key)),
    clear: () => setCart(clearCart()),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

export function useCartCount(): number {
  const ctx = useContext(CartContext)
  return ctx ? cartCount(ctx.cart) : 0
}

export function useCartTotal(): number {
  const ctx = useContext(CartContext)
  return ctx ? cartTotal(ctx.cart) : 0
}