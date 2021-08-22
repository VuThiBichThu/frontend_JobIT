import * as types from "../constants";

const initialState = {
  data: {
    itemsCount: 0
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_NOTI:
      return {
        ...state,
        data: actions.payload,
      };
    default:
      return state;
  }
}
