import {
  GET_GAMEPLAYS,
  GAMEPLAY_ERROR,
  ADD_GAMEPLAY,
  DELETE_GAMEPLAY,
} from "../actions/actionTypes";

const initialState = {
  gameplays: [],
  loading: true,
  error: {},
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_GAMEPLAYS:
      return {
        ...state,
        gameplays: payload,
        loading: false,
      };
    case ADD_GAMEPLAY:
      return {
        ...state,
        gameplays: [payload,...state.gameplays],
        loading: false,
      };
    case DELETE_GAMEPLAY:
      return {
        ...state,
        gameplays: state.gameplays.filter(
          (gameplay) => gameplay._id !== payload
        ),
        loading: false,
      };
    case GAMEPLAY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
