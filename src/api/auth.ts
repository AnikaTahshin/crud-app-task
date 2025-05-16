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

// login api
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

// refresh token api
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  return api.post("v1/token/refresh/", { refresh });
};

// logout
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};

// get all products api
export const getProducts = async (page: number, page_size: number) => {
  const response = await api.get<ProductResponse>(
    `/v1/product/?page=${page}&page_size=${page_size}`
  );
  return response.data;
};

// delete product api
export const deleteProduct = async (slug: string) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await api.delete(`/v1/product/${slug}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204 || response.status === 200) {
      return { success: true, message: "Product deleted successfully" };
    }

    throw new Error(response.data?.message || "Failed to delete product");
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Product not found");
    }
    if (error.response?.status === 401) {
      throw new Error("Authentication required");
    }
    throw new Error(
      error.response?.data?.message || "Failed to delete product"
    );
  }
};

// search products api
export const searchProducts = async (
  query: string,
  page = 1,
  pageSize = 10
) => {
  try {
    const response = await api.get<ProductResponse>(
      `/v1/product/?search=${encodeURIComponent(
        query
      )}&page=${page}&page_size=${pageSize}`
    );

    return response.data;
  } catch (error: any) {
    if (
      error.response?.status === 404 ||
      !error.response?.data?.data?.results?.length
    ) {
      throw new Error("No matching products found");
    }
    throw error;
  }
};
