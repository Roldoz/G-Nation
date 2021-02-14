import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_GAMES,
    GAME_ERROR,
    ADD_GAME,
    DELETE_GAME,
    GAME_LIKES,
    GAME_UNLIKES,
    UPDATE_GAME
  } from "./actionTypes";

  // Get games
  export const getGames = () => async (dispatch) => {
    try {
      const res = await axios.get("/api/games");
      dispatch({
        type: GET_GAMES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Add game
export const addGame = (data) => async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
  
    try {
      const res = await axios.post(`/api/games`, data, config);
  
      dispatch({
        type: ADD_GAME,
        payload: res.data,
      });
      dispatch(setAlert("Game added successfully", "success"));
      
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  
  //Delete game
  export const deleteGame = (gameId) => async (dispatch) => {
    try {
      await axios.delete(`/api/games/${gameId}`);
      dispatch({
        type: DELETE_GAME,
        payload: {id:gameId},
      });
      dispatch(getGames());
      
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  
  // Update game

  export const updateGame = (data,id) => async (dispatch) => {
   
    try {
      const res = await axios.put(`/api/games/${id}`,data);

      dispatch({
        type: UPDATE_GAME,
        payload: res.data,
      });
      dispatch(setAlert("Game updated", "success"));
      // dispatch(getGames());
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };


  
//ADD LIKE
export const likeGame = (gameId) => async (dispatch) => {
    try {
      const res = await axios.put(`/api/games/like/${gameId}`);
      dispatch({
        type: GAME_LIKES,
        payload: { gameId, likes: res.data },
      });
      dispatch(getGames());
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  // Unlike game
  export const unlikeGame = (gameId) => async (dispatch) => {
    try {
      const res = await axios.put(`/api/games/unlike/${gameId}`);
      dispatch({
        type: GAME_UNLIKES,
        payload: { gameId, unlikes: res.data },
      });
      dispatch(getGames());
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };