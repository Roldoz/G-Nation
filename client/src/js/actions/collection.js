import axios from "axios";
import {
  GET_COLLECTIONS,
  GET_COLLECTION,
  COLLECTION_ERROR,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  ADD_LIKES,
  REMOVE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./actionTypes";

//Get collections
export const getCollections = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/collections");
    dispatch({
      type: GET_COLLECTIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get collection
export const getCollection = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/collections/${id}`);
    dispatch({
      type: GET_COLLECTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add collection
export const addCollection = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/api/collections`, formData, config);

    dispatch({
      type: ADD_COLLECTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete collection
export const deleteCollection = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/collections/${id}`);
    dispatch({
      type: DELETE_COLLECTION,
      payload: { id: id },
    });
    dispatch(getCollections());
    // dispatch(setAlert("Collection has been removed", "success"));
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD LIKE
export const addLike = (collectionId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/collections/like/${collectionId}`);
    dispatch({
      type: ADD_LIKES,
      payload: { collectionId, likes: res.data },
    });
    dispatch(getCollections());
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Remove Like
export const removeLike = (collectionId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/collections/unlike/${collectionId}`);
    dispatch({
      type: REMOVE_LIKES,
      payload: { id: collectionId, likes: res.data },
    });
    dispatch(getCollections());
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (collectionId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/collections/comment/${collectionId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete comment
export const deleteComment = (collectionId, commentId) => async (dispatch) => {
  try {
    await axios.delete(
      `/api/collections/comment/${collectionId}/${commentId}`
    );
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
