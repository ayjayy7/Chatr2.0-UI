import axios from "axios";
import { FETCH_CHANNELS } from "./actionTypes";
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
