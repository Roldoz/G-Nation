import axios from 'axios';
import {getProfiles} from '../actions/profile'
import {
    GET_GAMEPLAYS,
    GAMEPLAY_ERROR,
    ADD_GAMEPLAY,
    DELETE_GAMEPLAY
  } from "./actionTypes";

   // Get gameplays
   export const getGameplays = () => async (dispatch) => {
    try {
      const res = await axios.get("/api/gameplays");
      dispatch({
        type: GET_GAMEPLAYS,
        payload: res.data,
      });
      // dispatch (getProfiles())
    } catch (err) {
      dispatch({
        type: GAMEPLAY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  
// Add gameplay
export const addGameplay = (data) => async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
  
    try {
      const res = await axios.post(`/api/gameplays`, data, config);
  
      dispatch({
        type: ADD_GAMEPLAY,
        payload: res.data,
      });
      
      
    } catch (err) {
      dispatch({
        type: GAMEPLAY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  
  //Delete gameplay
  export const deleteGameplay = (id) => async (dispatch) => {
    try {
      await axios.delete(`/api/gameplays/${id}`);
      dispatch({
        type: DELETE_GAMEPLAY,
        payload: {id},
      });
      dispatch(getGameplays());
      
    } catch (err) {
      dispatch({
        type: GAMEPLAY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  