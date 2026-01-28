import api from "./axiosClient";

export const getDashboardVideos = () =>
  api.get("/dashboard");

export const getPlaybackToken = (videoId) =>
  api.get(`/video/${videoId}/stream`);

export const playVideo = (videoId, token) =>
  api.get(`/video/${videoId}/play?token=${token}`);
