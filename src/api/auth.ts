/* eslint-disable @typescript-eslint/no-explicit-any */
import api from ".";
import { setTokens } from "../services/auth.service";

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
  return api.post<TokenResponse>("v1/token/refresh/", { refresh });
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};
