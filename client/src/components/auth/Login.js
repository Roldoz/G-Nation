import "./login.css";
import {useState} from 'react'
import { Link , Redirect } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../../js/actions/authAction'
import {motion} from 'framer-motion'

function Login() {

const dispatch = useDispatch();
const authenticated = useSelector(state => state.auth.isAuth);
  const [inputs,setInputs] = useState({
  email:'',password :''
  });
  const {email, password} = inputs;
  const changeHandle = (e) => setInputs({...inputs,[e.target.name]:e.target.value});
  const submitHandle = (e) =>{
    e.preventDefault()
    dispatch(login(email,password))
  console.log(inputs)
  }

  // Redirection
if(authenticated){
  return <Redirect to='/dashboard' />
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


  return (
    <motion.div 
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    
    className="grid">
      <form method="POST" className="form login" onSubmit={e=>submitHandle(e)}>
        <div className="form__field">
          <label for="login__username"></label>
          <input
             value={email}
            type="email"
            name="email"
            className="loginInput"
            placeholder="Email"
          
            autocomplete="off"
            onChange={e => changeHandle(e)}
          />
        </div>

        <div className="form__field">
          <label for="login__password"></label>
          <input
            value={password}
            type="password"
            name="password"
            className="loginInput"
            placeholder="Password"
        
            onChange={e => changeHandle(e)}
            minLength='6'
          />
        </div>

        <div>
          <button className="lbutton" type="submit" value="Sign In">
            {" "}
            Sign In <span>n</span>
            <span>a</span>
            <span>t</span>
            <span>i</span>
            <span>o</span>
            <span>n</span>
          </button>
        </div>
      </form>

      <p className="text--center">
        Not a member ? <Link to="/register"> Sign up now</Link>
      </p>
    </motion.div>
  );
}

export default Login;
