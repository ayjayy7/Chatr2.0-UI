import {
  FETCH_CHANNELS,
  FETCH_CHANNEL,
  SEND_MESSAGE,
  ADD_CHANNEL,
  FILTER_CHANNELS
} from "../actions/actionTypes";
const initialState = {
  channels: [],
  currentChannel: null,
  filteredChannels: []
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHANNELS:
      const allChannels = payload;
      return {
        ...state,
        channels: allChannels,
        filteredChannels: allChannels
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
    case FILTER_CHANNELS:
      return {
        ...state,
        filteredChannels: state.channels.filter(channel => {
          return `${channel.name}`
            .toLowerCase()
            .includes(payload.toLowerCase());
        })
      };
    default:
      return state;
  }
};
export default reducer;
