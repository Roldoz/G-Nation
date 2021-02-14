import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProfileById } from "../../js/actions/profile";
import Spinner from "../style/Spinner";
import "./profile.css";
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

function Profile({ match }) {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [getProfileById]);

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



  return !profile || loading ? (
    <Spinner />
  ) : (
    <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}>
       <Link to="/collections">
        <button className="backColPro"> Back</button>
      </Link>
      <figure className="snip">
        
        <div className="profile-image">
          <img src={profile && profile.user.avatar} alt="sample47" />
        </div>
        <figcaption>
          <h2>{profile && profile.user.name} </h2>
          {profile.type && <h4>{profile.type} </h4>}
          {profile.platform && <h4>play on : {profile.platform} </h4>}
          {profile.location && <p>From : {profile.location} </p>}
          {profile.bio && (
            <>
              <hr />
              <p>
                {`${profile.user.name.trim().split(" ")[0]}'s Bio`} :{" "}
                {profile.bio}{" "}
              </p>
              <hr />
            </>
          )}
          {profile.favoriteGames.map((game, i) => (
            <ul key={i} className="listGames">
              <li>
                <i class="fas fa-heart"></i> {game}{" "}
              </li>{" "}
            </ul>
          ))}

          <div className="icons">
            {profile.social && profile.social.twitch && (
              <a href={profile.social.twitch} target="_blank" rel="aaa">
                <i class="fab fa-twitch"></i>
              </a>
            )}
            {profile.social && profile.social.facebook && (
              <a href={profile.social.facebook} target="_blank" rel="aaa">
                <i class="fab fa-facebook"></i>
              </a>
            )}
            {profile.social && profile.social.youtube && (
              <a href={profile.social.youtube} target="_blank" rel="aaa">
                <i class="fab fa-youtube"></i>
              </a>
            )}
            {profile.social && profile.social.instagram && (
              <a href={profile.social.instagram} target="_blank" rel="aaa">
                <i class="fab fa-instagram"></i>
              </a>
            )}
          </div>
        </figcaption>
      </figure>
    </motion.div>
  );
}

export default Profile;
