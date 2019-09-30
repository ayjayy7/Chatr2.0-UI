import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER, SET_ERRORS } from "./actionTypes";

import { setErrors } from "./errors";
import { fetchAllChannels } from "./channels";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const checkForExpiredToken = () => {
  return dispatch => {
    // Check for token expiration
    const token = localStorage.getItem("token");

    if (token) {
      const currentTimeInSeconds = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      // Check token expiration
      if (user.exp >= currentTimeInSeconds) {
        // Set user
        dispatch(setCurrentUser(token));
      } else {
        return logout();
      }
    }
  };
};

export const login = (userData, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
      history.replace("/private");
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: null
      });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      console.error(err);
    }
  };
};

export const signup = (userData, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/signup/",
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
      history.replace("/private");
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      console.error(err);
      console.error(err.response.data);
    }
  };
};

const setCurrentUser = token => {
  return async dispatch => {
    let user = null;
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `jwt ${token}`;
      user = jwt_decode(token);
      dispatch(fetchAllChannels());
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    }
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    });
  };
};

export const logout = () => {
  return setCurrentUser();
};
