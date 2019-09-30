import { FETCH_CHANNELS } from "../actions/actionTypes";
const initialState = {
  channels: []
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHANNELS:
      const newChannel = payload;
      return {
        ...state,
        channels: newChannel
      };
    default:
      return state;
  }
};
export default reducer;
