const BACKEND_URL = process.env.BACKEND_URL!;

export interface CartItemPayload {
  mealId: string;
  quantity?: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}

export const cartService = {
  addToCart: async (payload: CartItemPayload) => {
    const res = await fetch(` /api/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    return res.json();
  },

  getCartItems: async () => {
    const res = await fetch(` /api/carts`, {
      cache: "no-store",
      credentials: "include",
    });

    return res.json();
  },

  getCartItemById: async (id: string) => {
    const res = await fetch(` /api/carts/${id}`, {
      cache: "no-store",
      credentials: "include",
    });

    return res.json();
  },

  updateCartItem: async (id: string, payload: UpdateCartItemPayload) => {
    const res = await fetch(` /api/carts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    return res.json();
  },

  deleteCartItem: async (id: string) => {
    const res = await fetch(` /api/carts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    return res.json();
  },
};