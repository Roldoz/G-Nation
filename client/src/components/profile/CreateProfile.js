import {useState} from 'react';
import './createProfile.css';
import {useDispatch} from 'react-redux';
import {createProfile} from '../../js/actions/profile';
import { useHistory } from "react-router-dom";
import {motion} from 'framer-motion'

function CreateProfile() {

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

  const history = useHistory();
  const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        type: "",
        platform: "",
        location: "",
        bio: "",
        age: "",
        favoriteGames: "",
        youtube: "",
        facebook: "",
        twitch: "",
        instagram: "",
        
      });
      
    
      const {
        type,
        platform,
        location,
        bio,
        age,
        favoriteGames,
        youtube,
        facebook,
        twitch,
        instagram
      } = formData;
    
      const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
      const onSubmit = e => {
        e.preventDefault();
        dispatch(createProfile(formData, history));
      };


    return (
       <motion.div className='createPro'
       initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}>

 <h1>Create Your Profile  <i class="fas fa-gamepad"></i>  Join the nation  </h1><br/>
    
      <form className="globalForm" onSubmit={e=>onSubmit(e)} >
        <div>
          <select className='kind' name="type" value={type} onChange={e => onChange(e)}>
            <option value="0">which kind of gamers are you ?</option>
            <option value="Retro gamer">Retro gamer</option>
            <option value="Hardcore gamer">Hardcore gamer</option>
            <option value="Casual gamer">Casual gamer</option>
            <option value="Streamer">Streamer</option>
            <option value="Pro e-sport gamer">Pro e-sport gamer</option>
            <option value="Light gamer">Light gamer</option>
            <option value="Other">Other</option>
          </select>
          <small >
            Give us an idea of where you are at in your career * Mandatory *
          </small>
        </div>
        <div>
          <input
            type="text"
            placeholder="Platform"
            name="platform"
            value={platform}
            onChange={e => onChange(e)}
            autoComplete='off'
          />
          <small>
            Your favorite platform to play on * Mandatory *
          </small>
        </div>
        <div >
          <input
            type="text"
            placeholder="location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
            autoComplete='off'
          />
          <small>
            Tell us from where you are
          </small>
        </div>
        {/* <div>
          <input
            type="text"
            placeholder="age"
            name="age"
            value={age}
            onChange={e => onChange(e)}
          />
          <small>
            Old or young gamer!! ^^
          </small>
        </div> */}
        <div>
          <input
            type="text"
            placeholder="Favorite Games"
            name="favoriteGames"
            value={favoriteGames}
            onChange={e => onChange(e)}
          />
          <small>
            Please use comma separated values (eg. Doom,Fifa,Tekken)
          </small>
        </div>
    
        <div>
          <textarea className='bio'
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small>Tell us a little about yourself</small>
        </div>

            <div className="social-input">
              <i className="fab fa-twitch fa-2x"></i>
              <input
                type="text"
                placeholder="twitch"
                name="twitch"
                value={twitch}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube"
                name="youtube"
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
      
<button type="submit"> Create Profile </button>
       
      </form>

         
       </motion.div>    
    )
}

export default CreateProfile
