const localBackendURL = "http://localhost:5001";

export const backendURL =
  process.env.REACT_APP_BACKEND_URL ||
  (process.env.NODE_ENV === "production" ? "" : localBackendURL);
