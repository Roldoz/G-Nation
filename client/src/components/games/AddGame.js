import './addgame.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import {addGame} from '../../js/actions/game';
import {motion} from 'framer-motion';
// import { useHistory } from "react-router-dom";

function AddGame() {

    const dispatch = useDispatch();
    // const history = useHistory();
    const [data, setData] = useState({
        name: "",
        type: "",
        description: "",
        photo: ""
      });

      const { name, type, description,photo } = data;

      const onChange = e =>
      setData({ ...data, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();
      dispatch(addGame(data));
  setData({
    name: "",
    type: "",
    description: "",
    photo: ""
  })
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
        <motion.div className='addGame'
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        >
            <h2>Add new game</h2>
            <form className='gameForm' onSubmit={onSubmit}>
            <input
            type="text"
            placeholder="title"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            autoComplete='off'
          />
           <input
            type="text"
            placeholder="Type"
            name="type"
            value={type}
            onChange={e => onChange(e)}
            autoComplete='off'
          />
               <input
            type="text"
            placeholder="Wallpaper link"
            name="photo"
            value={photo}
            onChange={e => onChange(e)}
            autoComplete='off'
          />
            <textarea className='bio'
            placeholder="Description"
            name="description"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>

          <button type='submit'> Add </button>

            </form>
        </motion.div>
    )
}

export default AddGame
