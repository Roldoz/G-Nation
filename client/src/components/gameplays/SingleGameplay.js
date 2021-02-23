import "./SingleGameplay.css";

import { useSelector, useDispatch } from "react-redux";
/* import { forwardRef } from "react"; */
// import {Link} from 'react-router-dom';
import ReactPlayer from "react-player";
import { deleteGameplay } from "../../js/actions/gameplay";

function SingleGameplay({ gameplay: { _id, title, url, user } }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="gameplay">
      <h2>{title} </h2>
      <h3>Posted by : {user.name}</h3>
      {!auth.loading && user._id === auth.user._id && (
        <button
          className="comBut"
          onClick={() => dispatch(deleteGameplay(_id))}
        >
          <i class="far fa-times-circle fa-2x"></i>
        </button>
      )}
      <ReactPlayer url={url} controls="true" width="100%" />
    </div>
  );
}

export default SingleGameplay;
