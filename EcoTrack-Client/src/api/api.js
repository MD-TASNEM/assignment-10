import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Challenges API
export const challengesAPI = {
  getAll: (params) => api.get("/api/challenges", { params }),
  getById: (id) => api.get(`/api/challenges/${id}`),
  create: (data) => api.post("/api/challenges", data),
  update: (id, data) => api.patch(`/api/challenges/${id}`, data),
  delete: (id) => api.delete(`/api/challenges/${id}`),
  join: (id) => api.post(`/api/challenges/join/${id}`),
};

// User Challenges API
export const userChallengesAPI = {
  getAll: () => api.get("/api/user-challenges"),
  updateProgress: (challengeId, progress) =>
    api.patch(`/api/user-challenges/${challengeId}/progress`, { progress }),
  getStats: () => api.get("/api/user-challenges/stats"),
};

// Tips API
export const tipsAPI = {
  getAll: (params) => api.get("/api/tips", { params }),
  getRecent: () => api.get("/api/tips/recent"),
  create: (data) => api.post("/api/tips", data),
  upvote: (id) => api.patch(`/api/tips/${id}/upvote`),
};

// Events API
export const eventsAPI = {
  getAll: () => api.get("/api/events"),
  getUpcoming: () => api.get("/api/events/upcoming"),
  getById: (id) => api.get(`/api/events/${id}`),
  create: (data) => api.post("/api/events", data),
  join: (id) => api.post(`/api/events/${id}/join`),
};

// Stats API
export const statsAPI = {
  getCommunity: () => api.get("/api/stats/community"),
  getLeaderboard: () => api.get("/api/stats/leaderboard"),
};

// Auth API
export const authAPI = {
  issueToken: (data) => api.post("/auth/token", data),
};

export default api;
