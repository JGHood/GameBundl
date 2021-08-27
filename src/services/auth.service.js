import axios from "axios";

const API_URL = "https://spring-video-games.azurewebsites.net/api/auth/";

const signup = (firstName, lastName, username, email, password) => {
  return axios.post(API_URL + "signup", {
    firstName,
    lastName,
    username,
    email,
    password,
  });
};

const login = (usernameOrEmail, password) => {
    console.log(usernameOrEmail);
  return axios
    .post(API_URL + "login", {
      usernameOrEmail,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("jwt", JSON.stringify(response.data.accessToken));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("jwt");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("jwt"));
};

export default {
  signup,
  login,
  logout,
  getCurrentUser,
};