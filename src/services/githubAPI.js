import axios from "axios";

const BASE_URL = "https://api.github.com";

export const getUserProfile = (username) =>
  axios.get(`${BASE_URL}/users/${username}`);

export const getUserRepos = (username) =>
  axios.get(`${BASE_URL}/users/${username}/repos`);

export const getRepoLanguages = (username, repo) =>
  axios.get(`${BASE_URL}/repos/${username}/${repo}/languages`);

export const getUserActivity = (username) =>
  axios.get(`${BASE_URL}/users/${username}/events/public`);

export const getRateLimit = () => axios.get(`${BASE_URL}/rate_limit`);