import axios from "axios";
import Cookies from "js-cookie";

const ENDPOINT_PATH = "http://127.0.0.1:5000/";

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  register(payload) {
    return axios.post(ENDPOINT_PATH + "register", payload);
  },
  login(payload) {
    return axios.post(ENDPOINT_PATH + "login", payload);
  },
  deleteUserLogged() {
    Cookies.remove('userLogged');
  },
};

