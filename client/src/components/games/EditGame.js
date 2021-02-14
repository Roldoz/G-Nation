import "./addgame.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGame, getGames } from "../../js/actions/game";
import { useHistory } from "react-router-dom";
import {motion} from 'framer-motion';

function EditGame({ match }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    photo: "",
    description: "",
  });

  const { type, name, photo, description } = formData;

  const dispatch = useDispatch();
  const history = useHistory();
  const game = useSelector((state) =>
    state.game.games.find((g) => g._id === match.params.id)
  );
  const loading = useSelector((state) => state.game.loading);

  useEffect(() => {
    dispatch(getGames());
    setFormData({
      name: loading || !game.name ? "" : game.name,
      type: loading || !game.type ? "" : game.type,
      photo: loading || !game.photo ? "" : game.photo,
      description: loading || !game.description ? "" : game.description,
    });
    // console.log(game.type)
  }, [loading]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGame(formData, match.params.id));
    dispatch(getGames());
    // history.goBack()
  };

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


  return (
    <motion.div className="addGame"
    initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}>
      <h2>Edit game</h2>
      <form className="gameForm" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Type"
          name="type"
          value={type}
          onChange={(e) => onChange(e)}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Wallpaper link"
          name="photo"
          value={photo}
          onChange={(e) => onChange(e)}
          autoComplete="off"
        />
        <textarea
          className="bio"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => onChange(e)}
        ></textarea>

        <button type="submit"> Edit </button>
      </form>
    </motion.div>
  );
}

export default EditGame;
