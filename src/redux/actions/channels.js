import axios from "axios";
import {
  FETCH_CHANNELS,
  FETCH_CHANNEL,
  SEND_MESSAGE,
  ADD_CHANNEL
} from "./actionTypes";
import { setErrors } from "./errors";
export const fetchAllChannels = () => {
  return async dispatch => {
    try {
      const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
      const channels = res.data;
      console.log(channels);
      dispatch({
        type: FETCH_CHANNELS,
        payload: channels
      });
    } catch (error) {
      console.error(error);
      dispatch(setErrors(error));
    }
  };
};

export const fetchChannel = channelID => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}`
      );
      const channel = res.data;
      console.log("hehe", channel);
      dispatch({
        type: FETCH_CHANNEL,
        payload: channel
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const sendMessage = (channelID, message, user) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `https://api-chatr.herokuapp.com/channels/${channelID}/send/`,
        message
      );
      const messageObject = {
        id: user.user_id,
        username: user.username,
        message: res.data.message,
        timestamp: new Date(),
        channel: channelID
      };
      dispatch({
        type: SEND_MESSAGE,
        payload: messageObject
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export const addChannel = name => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create/",
        name
      );
      const newChannel = res.data.name;
      dispatch({
        type: ADD_CHANNEL,
        payload: newChannel
      });
    } catch (error) {
      console.error(error);
      console.error(error.response.data);
    }
  };
};
