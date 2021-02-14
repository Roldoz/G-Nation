import SingleGame from "./SingleGame";
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../style/Spinner";
import FlipMove from "react-flip-move";
import "./games.css";
import { Link } from "react-router-dom";
import { getGames } from "../../js/actions/game";
import {motion} from 'framer-motion';

function Games() {
  const games = useSelector((state) => state.game.games);
  const loading = useSelector((state) => state.game.loading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, [getGames]);

  const [search, setSearch] = useState("");
  const filteredGames = games.filter(
    (game) =>
      game.name.toLowerCase().includes(search.toLowerCase().trim()) 
     
  );

 

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

  return loading ? (
    <Spinner />
  ) : (
    <motion.div className="gamesPage"
    initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}>
      {/* <h1> Vote games</h1> */}
      <input
        type="text"
        placeholder="Game Search"
        onChange={(e) => setSearch(e.target.value)}
      />

      {user && user.role === 1 ? (
        <Link to="/add-game">
          <button className="postGame">Post Game </button>
        </Link>
      ) : null}

      <div>
        <FlipMove
          staggerDurationBy={200}
          enterAnimation="fade"
          leaveAnimation="fade"
        >
          {filteredGames.map((game) => (
            <SingleGame key={game._id} game={game} />
          ))}
        </FlipMove>
      </div>
    </motion.div>
  );
}

export default Games;
