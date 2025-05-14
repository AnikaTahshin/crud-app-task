export const setTokens = (access: string, refresh: string) => {
  if (!access || !refresh) {
    console.error("Invalid tokens received:", { access, refresh });
    return;
  }
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// Add this function to debug token storage
export const checkTokens = () => {
  const access = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");
  console.log("Current tokens:", { access, refresh });
  return { access, refresh };
};
