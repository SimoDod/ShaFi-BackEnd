export const clearAuthSession = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getAuthToken = () => localStorage.getItem("token");
