import { useState } from "react";
import { useDispatch } from "react-redux";
import {addGameplay} from '../../js/actions/gameplay';
import "./gameplays.css";


function AddGameplay() {
    const dispatch = useDispatch();
    
    const [data, setData] = useState({
        title: "",
        url: ""
      });
      const { title,url } = data;

      const onChange = e =>
      setData({ ...data, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();
      dispatch(addGameplay(data));
  setData({
    title: "",
    url: ""
  })
    };


    return (
        <div >
            <form className='addGampl' onSubmit={onSubmit}>
            <input
            type="text"
            placeholder="Gameplay's title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
            autoComplete='off'
          />
           <input
            type="text"
            placeholder="Url address ( youtube, dailymotion.. )"
            name="url"
            value={url}
            onChange={e => onChange(e)}
            autoComplete='off'
          />
       
         

          <button type='submit'> Add gameplay </button>

            </form>
        </div>
    )
}

export default AddGameplay
