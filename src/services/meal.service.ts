const NEXT_PUBLIC_API_URL = typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BACKEND_URL;

export interface MealData {
  id?: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId?: string;
  isAvailable?: boolean;
}

export const mealService = {
  getAllMeals: async () => {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/meals`, {
      cache: "no-store",
      credentials: "include",
    });
    return res.json();
  },

  getMealById: async (id: string) => {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/meals/${id}`, {
      cache: "no-store",
      credentials: "include",
    });
    return res.json();
  },

  createMeal: async (payload: MealData) => {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/meals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    return res.json();
  },

  updateMeal: async (id: string, payload: Partial<MealData>) => {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/meals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    return res.json();
  },

  deleteMeal: async (id: string) => {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/meals/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },
};