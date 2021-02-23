import SingleGameplay from './SingleGameplay';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../style/Spinner";
import "./gameplays.css";
// import { Link } from "react-router-dom";
import { getGameplays,addGameplay } from "../../js/actions/gameplay";
import AddGameplay from './AddGameplay';
import {motion} from 'framer-motion';

function Gameplays() {

    const gameplays = useSelector((state) => state.gameplay.gameplays);
    const loading = useSelector((state) => state.gameplay.loading);
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getGameplays());
    }, [getGameplays]);

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
        <motion.div 
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className='gameplays'>
        {/* <h1>Add New Gameplay</h1> */}
       <AddGameplay />
       
         <div className='mapped-gameplays'>
           
         
              {gameplays.map((gameplay) => (
                <SingleGameplay key={gameplay._id} gameplay={gameplay} />
              ))}
              
         </div>
           
           
        </motion.div>
      );
}

export default Gameplays
