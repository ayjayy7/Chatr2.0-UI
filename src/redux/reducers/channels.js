import {
  FETCH_CHANNELS,
  FETCH_CHANNEL,
  SEND_MESSAGE,
  ADD_CHANNEL
} from "../actions/actionTypes";
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
      return {
        ...state,
        currentChannel: newChannel
      };
    case SEND_MESSAGE:
      return {
        ...state,
        currentChannel: state.currentChannel.concat(payload)
      };
    case ADD_CHANNEL:
      return {
        ...state,
        channels: state.channels.concat(payload)
      };
    default:
      return state;
  }
};
export default reducer;
