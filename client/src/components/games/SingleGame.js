import './singleGame.css';
import {deleteGame, likeGame,unlikeGame} from '../../js/actions/game';
import {useDispatch,useSelector} from 'react-redux';
import { forwardRef } from "react";
import {Link} from 'react-router-dom';


const SingleGame =forwardRef( ({game:{_id,name,type,photo,description,user,likes,unlikes}},ref) => {

  const auth = useSelector((state) => state.auth);
const dispatch = useDispatch();

    return (
        <div ref={ref}>


<div className="content-wrapper">
  
  <div className="news-card">
    
    <img src={photo} alt="" className="news-card__image"/>
    <div className="news-card__text-wrapper">
      <h2 className="news-card__title">{name} </h2>
      <div className="news-card__post-date">{type} </div>
      <div className="news-card__details-wrapper">
        <p className="news-card__excerpt">{description} </p>
        <div className='votes'>
 <button className="news-card__button"
 onClick={()=>dispatch(likeGame(_id))}>
          <i class="fas fa-chevron-circle-up fa-2x"></i>
          <span>{likes.length}</span>
          </button>

          <button className="news-card__button2"
          onClick={()=>dispatch(unlikeGame(_id))}>
          <i class="fas fa-chevron-circle-down fa-2x"></i>
          <span>{unlikes.length}</span>
          </button>

          {!auth.loading && 
          user === auth.user._id  &&
           (<>
              <button
              className='deleteGame'
                title="Delete game"
                type="button"
                onClick={() => dispatch(deleteGame(_id))}
              >
                Delete 
              </button>
               <Link to={`/edit-game/${_id}`}>
               <button className='deleteGame' title='Edit profile'> 
               
               Edit </button>
             </Link></> 
            
            )}

        </div>
        

          
      </div>
    </div>
  </div>

</div>


        </div>
    )
})

export default SingleGame
