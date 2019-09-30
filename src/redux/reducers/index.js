import { combineReducers } from "redux";
import channelReducer from "./channels";

// Reducers
import authReducer from "./authentication";
import errorReducer from "./errors";

export default combineReducers({
  user: authReducer,
  errors: errorReducer,
  channels: channelReducer
});
