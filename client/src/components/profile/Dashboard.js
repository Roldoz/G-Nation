import { useEffect, useState } from "react";
import "./profile.css";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, deleteAccount } from "../../js/actions/profile";

import Spinner from "../style/Spinner";
import { Link, Redirect } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);

  useEffect(() => {
    dispatch(getProfile());
  }, [getProfile]);

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
  };

  return loading && !profile ? (
    <Spinner />
  ) : (
    <>
      {profile !== null ? (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
        >
          <figure className="snip">
            <div className="profile-image">
              <img src={user && user.avatar} alt="sample47" />
            </div>
            <figcaption>
              <h2>{user && user.name} </h2>
              {profile.type && <h4>{profile.type} </h4>}
              {profile.platform && <h4>play on : {profile.platform} </h4>}
              {profile.location && <p>From : {profile.location} </p>}
              {profile.bio && (
                <>
                  <hr />
                  <p>
                    {`${user.name.trim().split(" ")[0]}'s Bio`} : {profile.bio}{" "}
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

              {/* {user && user.role === 1(
  <h1> Im adminnnnnnn</h1>
) } */}
              {/* { user && user.role===1 ?
   <h1>Adminnnnnnn</h1>:null

 
} */}

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
              <Link to="/edit-profile">
                <button className="edpro" title="Edit profile">
                  Edit{" "}
                </button>
              </Link>

              <button
                onClick={() => dispatch(deleteAccount())}
                className="delpro"
                title="Delete account"
              >
                Delete
              </button>
            </figcaption>
          </figure>
        </motion.div>
      ) : (
        <Redirect to="/create-profile" />
      )}
    </>
  );
}

export default Dashboard;
