import "./register.css";
import {useState} from 'react'
import { Link,Redirect } from "react-router-dom";
import {register} from '../../js/actions/authAction';
import { useDispatch,useSelector } from "react-redux";
import{setAlert} from '../../js/actions/alert' ;
import FileBase from 'react-file-base64';
import {motion} from 'framer-motion'

function Register() {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.auth.isAuth);

  const [inputs,setInputs] = useState({
    name:'', email:'',password :'',repassword:'',avatar:''
  });

  const {name, email, password,repassword,avatar} = inputs;
const changeHandle = (e) => setInputs({...inputs,[e.target.name]:e.target.value});
const submitHandle = (e) =>{
  e.preventDefault()
  if (password !== repassword){
    dispatch(setAlert("passwords don't match",'danger'))
    
  }
  else {
    console.log(inputs)
    dispatch(register({ name, email, password,avatar }));
    dispatch(setAlert("User successfully created ",'success'))
  }
};


  // Redirection
  if(authenticated){
    return <Redirect to='/login' />
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
    className="grid"
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    >
      <form method="POST" className="form login" onSubmit={e=>submitHandle(e)}>
        <div className="form__field">
          <label for="login__username"></label>
          <input
            value={name}
            type="text"
            name="name"
            className="form__input"
            placeholder="Name"
            required
            autocomplete="off"
            onChange={e => changeHandle(e)}
          />
        </div>
        <div className="form__field">
          
          <input
            value={email}
            type="email"
            name="email"
            className="form__input"
            placeholder="Email"
            required
            autocomplete="off"
            onChange={e => changeHandle(e)}
          />
        </div>

<div className="div_form__field">
<label>Profile Picture : </label>
          <FileBase
            typel="file"
            multiple={false}
            onDone={({ base64 }) =>
              setInputs({ ...inputs, avatar: base64 })
            }
           
          />

          
        </div>


        {/* <div className="form__field">
          
          <input
            value={avatar}
            type="text"
            name="avatar"
            className="form__input"
            placeholder="profile picture link "
            autocomplete="off"
            required
            onChange={e => changeHandle(e)}
          />
        </div> */}

        <div className="form__field">
          
          <input
            value={password}
            type="password"
            name="password"
            className="form__input"
            placeholder="Password"
            onChange={e => changeHandle(e)}
            minLength='6'
          />
        </div>
        <div className="form__field">
          <label for="password"></label>
          <input
            value={repassword}
            type="password"
            name="repassword"
            className="form__input"
            placeholder="Confirm password"
            onChange={e => changeHandle(e)}
            minLength='6'
          />
        </div>

        <div className="loginbtn">
          <button className="lbutton" type="submit" value="Sign Up">
          Sign Up
          </button>
        </div>
      </form>

      <p className="text--center">
        Already a member ? <Link to="/login"> Sign in</Link>
      </p>
    </motion.div>
  );
}


export default Register;
