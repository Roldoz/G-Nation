import {Link} from 'react-router-dom';
import G from './ita.png';
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../js/actions/authAction'

function Navbar() {

const dispatch = useDispatch();
const loading = useSelector(state => state.auth.loading);
const authentificated = useSelector(state => state.auth.isAuth);

const authNav =(
  <ul>
  <li>
    <Link to="/collections">
    Collections</Link>
    </li>

    <li>
    <Link to="/gameplays">
    Gameplays </Link>
  </li>
 

    <li>
    <Link to="/games">
    Vote</Link>
  </li>
  <li>
    <Link to="/mini-game">
    Mini game</Link>
    </li>

<li>
    <Link to="/dashboard">
    Profile</Link>
  </li>
 

    <li className='logout'>
      <motion.button 
      whileHover={{ y: 3 }}
      onClick={()=>dispatch(logout())} href='#!'>
Logout
      </motion.button>
    </li>
  </ul>
);

const guestNav =(
  <ul> 
  <li>
    <Link to="/register">Sign Up</Link>
  </li>
  <li>
    <Link to="/login">
    <motion.button
    whileHover={{ y: 3 }}>Sign in</motion.button></Link>
  </li>
</ul>
);

    return (
      <motion.div className="navbar"
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease:'easeIn'}}>
        <Link to='/'>
        <img src={G} alt="pic" /></Link>
        <nav>
         {!loading && 
         authentificated ? authNav : guestNav }
         
        </nav>
      </motion.div>
    )
}

export default Navbar
