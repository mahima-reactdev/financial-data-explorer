const isLocal = window.location.hostname === "localhost";

export const BASE_URL = isLocal
  ? "http://localhost:8080"
  : "https://financial-data-explorer.onrender.com";