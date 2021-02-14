import {
  GET_COLLECTIONS,
  GET_COLLECTION,
  COLLECTION_ERROR,
  ADD_LIKES,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  REMOVE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "../actions/actionTypes";

const initialState = {
  collection: null,
  collections: [],
  loading: true,
  error: {},
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_COLLECTIONS:
      return {
        ...state,
        collections: payload,
        loading: false,
      };
      case GET_COLLECTION:
        return{
          ...state,
          collection:payload,
          loading:false
        }
    case DELETE_COLLECTION:
      return {
        ...state,
        collections: state.collections.filter(
          (collection) => collection._id !== payload
        ),
        loading: false,
      };
      case ADD_COLLECTION:
      return {
        ...state,
        collections: [payload,...state.collections],
        loading: false,
      };
      case ADD_COMMENT:
        return{
          ...state,
          collection:{...state.collection, comments:payload},
          loading:false
        }
        case REMOVE_COMMENT:
          return{
            ...state,
            collection:{
              ...state.collection,
              comments:state.collection.comments.filter(
                comment=> comment._id !==payload
              )
            },
            loading:false
          }
    case ADD_LIKES:
    case REMOVE_LIKES:
      return {
        ...state,
        collections: state.collections.map((collection) =>
          collection._id === payload.id
            ? { ...collection, likes: payload.likes }
            : collection
        ),
        loading: false,
      };

    case COLLECTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
