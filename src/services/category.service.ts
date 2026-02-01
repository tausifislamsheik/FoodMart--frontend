const API_URL = typeof window !== "undefined" ? "" : process.env.BACKEND_URL;

export interface CategoryData {
  id?: string;
  name: string;
  slug: string;
}

export const categoryService = {
  getAllCategories: async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: data.message };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getCategoryById: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      return data.success
        ? { data: data.data, error: null }
        : { data: null, error: data.message };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  createCategory: async (categoryData: CategoryData) => {
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
        credentials: "include",
      });
      const data = await res.json();
      return data.error
        ? { data: null, error: { message: data.message } }
        : { data: data.data, error: null };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateCategory: async (id: string, categoryData: CategoryData) => {
    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
        credentials: "include",
      });
      const data = await res.json();
      return data.error
        ? { data: null, error: { message: data.message } }
        : { data: data.data, error: null };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  deleteCategory: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      return data.error
        ? { data: null, error: { message: data.message } }
        : { data: true, error: null };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};