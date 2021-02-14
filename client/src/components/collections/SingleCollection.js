import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { useState, forwardRef } from "react";
import "./singleCollection.css";
import {
  addLike,
  deleteCollection,
  removeLike,
} from "../../js/actions/collection";

const SingleCollection = forwardRef(
  (
    { collection: { _id, text, name, avatar,collectionImage, user, likes, comments, date } },
    ref
  ) => {
    const [liked, setLiked] = useState(false);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const like = () => {
      dispatch(addLike(_id));
      setLiked(true);
    };

    const unlike = () => {
      dispatch(removeLike(_id));
      setLiked(false);
    };

    return (
      <div ref={ref}>
        <article className="card">
          <Link to={`/profile/${user}`}>
            <span className="card__icon">
              <img src={avatar} alt="user" />
            </span>
          </Link>
          <h1 className="card__title">{name}</h1>

          <section className="card__content">{text}</section>
          <img
            className="card__image"
            src={collectionImage || "https://d2h1pu99sxkfvn.cloudfront.net/b0/5403822/483227829_1Il7NKrYTW/P0.jpg"}
            alt="card-img"
          />
          <section className="card__footer">
            <Moment format="DD-MM-YY HH:mm">{date}</Moment>
            <button onClick={liked ? unlike : like} type="button">
              <i className="fas fa-heart fa-2x"></i>
              <span>{likes.length}</span>
            </button>
            <button type="button">
              <i class="fas fa-comments fa-2x"></i>
              <span>{comments.length}</span>
            </button>
            <Link to={`/collections/${_id}`}>
              <button type="button" className="viewCol">
                <span > View collection </span>
              </button>
            </Link>
            {!auth.loading && user === auth.user._id  && (
              <button
                title="Delete collection"
                type="button"
                onClick={() => dispatch(deleteCollection(_id))}
              >
                <p>Delete </p>
              </button>
            )}
          </section>
        </article>
      </div>
    );
  }
);

export default SingleCollection;
