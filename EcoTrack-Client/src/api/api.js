import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Challenges API
export const challengesAPI = {
  getAll: (params) => api.get('/challenges', { params }),
  getById: (id) => api.get(`/challenges/${id}`),
  create: (data) => api.post('/challenges', data),
  update: (id, data) => api.put(`/challenges/${id}`, data),
  delete: (id) => api.delete(`/challenges/${id}`),
  join: (id) => api.post(`/challenges/join/${id}`),
};

// User Challenges API
export const userChallengesAPI = {
  getAll: () => api.get('/user-challenges'),
  updateProgress: (challengeId, progress) =>
    api.patch(`/user-challenges/${challengeId}/progress`, { progress }),
  getStats: () => api.get('/user-challenges/stats'),
};

// Tips API
export const tipsAPI = {
  getAll: () => api.get('/tips'),
  getRecent: () => api.get('/tips/recent'),
  create: (data) => api.post('/tips', data),
  upvote: (id) => api.patch(`/tips/${id}/upvote`),
};

// Events API
export const eventsAPI = {
  getAll: () => api.get('/events'),
  getUpcoming: () => api.get('/events/upcoming'),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  join: (id) => api.post(`/events/${id}/join`),
};

// Stats API
export const statsAPI = {
  getCommunity: () => api.get('/stats/community'),
  getLeaderboard: () => api.get('/stats/leaderboard'),
};

export default api;
