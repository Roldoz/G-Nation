import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { useState, useEffect } from "react";
import "./collection.css";
import Spinner from "../style/Spinner";
import FlipMove from "react-flip-move";
import {motion} from 'framer-motion';
import {
  addLike,
  deleteCollection,
  removeLike,
  getCollection,
} from "../../js/actions/collection";
import AddComment from "./AddComment";
import Comment from "./Comment";

function Collection({ match }) {
  const [liked, setLiked] = useState(false);
  const auth = useSelector((state) => state.auth);
  const collection = useSelector((state) => state.collection.collection);
  const loading = useSelector((state) => state.collection.loading);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCollection(match.params.id));
  }, [getCollection]);

  const like = () => {
    dispatch(addLike(collection._id));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(removeLike(collection._id));
    setLiked(false);
  };

  function handleClick() {
    dispatch(deleteCollection(collection._id))
    history.goBack()
  }

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  }

  return loading || collection === null ? (
    <Spinner />
  ) : (
    <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}>
      <Link to="/collections">
        <button className="backCol"> Back</button>
      </Link>

      <article className="cardCol">
        <Link to={`/profile/${collection && collection.user}`}>
          <span className="c__icon">
            <img src={collection.avatar} alt="user" />
          </span>
        </Link>
        <h1 className="c__title">{collection.name}</h1>

        <section className="c__content">{collection.text}</section>
        <img
          className="c__image"
          src={collection.collectionImage || 'https://d2h1pu99sxkfvn.cloudfront.net/b0/5403822/483227829_1Il7NKrYTW/P0.jpg'}
          alt="card-img"
        />
        <section className="card__footer">
          <Moment format="DD-MM-YY HH:mm">{collection.date}</Moment>
          <button onClick={liked ? unlike : like} type="button">
            <i className="fas fa-heart fa-2x"></i>
            <span>{collection.likes.length}</span>
          </button>

          <button type="button">
            <i class="fas fa-comments fa-2x"></i>
            <span>{collection.comments.length}</span>
          </button>

          {!auth.loading && collection.user === auth.user._id && (
            <button
              title="Delete collection"
              type="button"
              onClick={handleClick}
            >
              <p>Delete </p>
            </button>
          )}
        </section>
      </article>
      <AddComment collectionId={collection._id} />
      <FlipMove
        staggerDurationBy={220}
        enterAnimation="fade"
        leaveAnimation="fade"
      >
        {collection.comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            collectionId={collection._id}
          />
        ))}
      </FlipMove>
    </motion.div>
  );
}

export default Collection;
