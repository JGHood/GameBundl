import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://spring-video-games.azurewebsites.net/api/";


const getPublicContent = () => {
  return axios.get(API_URL + "/user/me");
};

const getUser = () => {
  return axios
    .get(API_URL + "user/me", {headers: authHeader() })
    .then((response) =>{
      localStorage.setItem("user",JSON.stringify(response.data));
      return response.data;
    }, (error) => {
      console.log(error);
    });
    
}

const isEmployee = () => {
  return axios
    .get(API_URL + "user/me", {headers: authHeader() })
    .then((response) =>{
      const isEmployee = false;
      if(response.data.roleId === 2)
      {
        isEmployee = true;
      }
      console.log(response);
      return isEmployee;
    }, (error) => {
      console.log(error);
    });
    
}

export default {
  getUser,
  isEmployee
};
