import { FETCH_CHANNELS, FETCH_CHANNEL } from "../actions/actionTypes";
const initialState = {
  channels: [],
  currentChannel: null
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHANNELS:
      const allChannels = payload;
      return {
        ...state,
        channels: allChannels
      };
    case FETCH_CHANNEL:
      const newChannel = payload;
      console.log("PLEASE", newChannel);
      return {
        ...state,
        currentChannel: newChannel
      };
    default:
      return state;
  }
};
export default reducer;
