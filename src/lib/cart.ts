export type CartItemKind = 'product' | 'custom'

export type CartItem = {
  /** Unique key per line item (product id, or custom id + timestamp). */
  key: string
  kind: CartItemKind
  name: string
  unitPrice: number
  qty: number
  /** Short ingredient detail (e.g. custom bowl choices). */
  detail?: string
}

export type CartState = {
  items: CartItem[]
  updatedAt: number
}

const STORAGE_KEY = 'pro-patara-cart-v1'

export function emptyCart(): CartState {
  return { items: [], updatedAt: 0 }
}

export function loadCart(): CartState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyCart()
    const parsed = JSON.parse(raw) as CartState
    if (!Array.isArray(parsed.items)) return emptyCart()
    return parsed
  } catch {
    return emptyCart()
  }
}

export function saveCart(cart: CartState): void {
  try {
    cart.updatedAt = Date.now()
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch {
    // storage may be unavailable (private mode); cart still works in-memory
  }
}

export function cartCount(cart: CartState): number {
  return cart.items.reduce((sum, item) => sum + item.qty, 0)
}

export function cartTotal(cart: CartState): number {
  return cart.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
}

export function addItem(cart: CartState, item: Omit<CartItem, 'qty'>, qty = 1): CartState {
  const existing = cart.items.find((i) => i.key === item.key)
  if (existing) {
    return {
      ...cart,
      items: cart.items.map((i) => (i.key === item.key ? { ...i, qty: i.qty + qty } : i)),
    }
  }
  return { ...cart, items: [...cart.items, { ...item, qty }] }
}

export function updateQty(cart: CartState, key: string, qty: number): CartState {
  if (qty <= 0) return removeItem(cart, key)
  return {
    ...cart,
    items: cart.items.map((i) => (i.key === key ? { ...i, qty } : i)),
  }
}

export function removeItem(cart: CartState, key: string): CartState {
  return { ...cart, items: cart.items.filter((i) => i.key !== key) }
}

export function clearCart(): CartState {
  return emptyCart()
}