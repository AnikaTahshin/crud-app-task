/* eslint-disable @typescript-eslint/no-explicit-any */
import api from ".";
import { setTokens } from "../services/auth.service";
import type { ProductResponse } from "../types/product.types";

interface LoginCredentials {
  email: string;
  password: string;
}

interface TokenData {
  id: number;
  profile_image: string;
  username: string;
  email: string;
  phone: string | null;
  access_token: string;
  refresh_token: string;
}

interface ApiResponse {
  code: number;
  message: string | null;
  status: string;
  data: TokenData;
  errors: null | any;
}

interface DeleteResponse {
  code: number;
  message: string;
  status: string;
  data: null;
  errors: null | any;
}

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post<ApiResponse>("/v1/token/", credentials);
  if (response.data.data?.access_token && response.data.data?.refresh_token) {
    setTokens(
      response.data.data.access_token,
      response.data.data.refresh_token
    );
  }
  return response;
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  return api.post("v1/token/refresh/", { refresh });
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};

export const getProducts = async (page: number, page_size: number) => {
  const response = await api.get<ProductResponse>(
    `/v1/product/?page=${page}&page_size=${page_size}`
  );
  return response.data;
};

export const deleteProduct = async (slug: string) => {
  try {
    const response = await api.delete<DeleteResponse>(`/v1/product/${slug}/`);

    // Log response for debugging
    console.log("Delete response:", response);

    // Handle successful deletion
    if (response.status === 204 || response.status === 200) {
      return { success: true, message: "Product deleted successfully" };
    }

    return response.data;
  } catch (error: any) {
    // Log the full error for debugging
    console.error("Delete error:", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      headers: error.config?.headers,
    });

    // Handle specific error cases
    if (error.response?.status === 404) {
      throw new Error("Product not found or already deleted");
    }

    // Re-throw other errors
    throw new Error(
      error.response?.data?.message || "Failed to delete product"
    );
  }
};

export const searchProducts = async (query: string) => {
  const response = await api.get<ProductResponse>(
    `/v1/product/?search=${query}`
  );
  return response;
};
