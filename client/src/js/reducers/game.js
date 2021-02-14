import {
  GET_GAMES,
  GAME_ERROR,
  ADD_GAME,
  DELETE_GAME,
  UPDATE_GAME,
  GAME_LIKES,
  GAME_UNLIKES,
} from "../actions/actionTypes";

const initialState = {
  game:null,
  games: [],
  loading: true,
  error: {},
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_GAMES:
      return {
        ...state,
        games: payload,
        loading: false,
      };
    case ADD_GAME:
      return {
        ...state,
        games: [payload, ...state.games],
        loading: false,
      };
    case DELETE_GAME:
      return {
        ...state,
        games: state.games.filter((game) => game._id !== payload),
        loading: false,
      };
      case UPDATE_GAME:
        return{
          ...state,
          games:[...state.games,payload],
          loading: false
        }
    case GAME_LIKES:
      return {
        ...state,
        games: state.games.map((game) =>
          game._id === payload.id ? { ...game, likes: payload.likes } : game
        ),
      };

    case GAME_UNLIKES:
      return {
        ...state,
        games: state.games.map((game) =>
          game._id === payload.id ? { ...game, unlikes: payload.unlikes } : game
        ),
      };

    case GAME_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
