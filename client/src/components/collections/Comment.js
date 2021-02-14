import { useDispatch,useSelector } from "react-redux";
import { deleteComment } from "../../js/actions/collection";
import "./addForm.css";
import {Link} from 'react-router-dom';
import {forwardRef} from "react";
import Moment from "react-moment";

const Comment = forwardRef(({
  collectionId,
  comment: { _id, text, avatar,name, user, date }
},ref) => {

const dispatch = useDispatch();
const auth = useSelector((state) => state.auth);

  return (
    <div ref={ref}>
      <article className="showCom" >
        <div className="userIcon">
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt="user" />
          </Link>
        </div>
     
        <div className="rightSec">
          <p>{name} <Moment format="DD-MM-YY HH:mm">{date}</Moment></p>

          <h4>{text} </h4>
        </div>

        {!auth.loading && user === auth.user._id &&(
            <button className='comBut'
            onClick={()=>dispatch(deleteComment(collectionId,_id))}
            > <i class="far fa-times-circle fa-2x"></i></button>
        )}
        
      </article>
    </div>
  );
})

export default Comment;
