const BACKEND_URL = process.env.BACKEND_URL!;

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
    const res = await fetch(` /api/meals`, {
      cache: "no-store",
      credentials: "include",
    });
    return res.json();
  },

  getMealById: async (id: string) => {
    const res = await fetch(` /api/meals/${id}`, {
      cache: "no-store",
      credentials: "include",
    });
    return res.json();
  },

  createMeal: async (payload: MealData) => {
    const res = await fetch(` /api/meals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    return res.json();
  },

  updateMeal: async (id: string, payload: Partial<MealData>) => {
    const res = await fetch(` /api/meals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    return res.json();
  },

  deleteMeal: async (id: string) => {
    const res = await fetch(` /api/meals/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },
};