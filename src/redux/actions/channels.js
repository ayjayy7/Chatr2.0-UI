import axios from "axios";
import { FETCH_CHANNELS, FETCH_CHANNEL } from "./actionTypes";
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
