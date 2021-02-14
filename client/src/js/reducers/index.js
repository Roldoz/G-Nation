import { combineReducers } from "redux";
import auth from "./auth";
import profile from './profile';
import alert from './alert';
import collection from './collection';
import game from './game'

export default combineReducers({
auth,
profile,
alert,
collection,
game
});