import { useState } from "react";
import { useDispatch } from "react-redux";
import "./addForm.css";
import { addCollection } from "../../js/actions/collection";

function AddCollection() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [file, setFile] = useState();

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("collectionImage", file);
    e.preventDefault();
    dispatch(addCollection(formData));
    setText("");
  };
  return (
    <>
      <article className="addCol">
        <form
          className="addForm"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <textarea
            className="textCol"
            name="text"
            value={text}
            placeholder="Describe your collection.."
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button className="butCol" type="submit">
            {" "}
            Add collection
          </button>
          
         
          
          
          <input type="file" name="collectionImage" onChange={onChangeFile} id='inputbtn' hidden/>
         <label for="inputbtn"><i class="fas fa-camera fa-2x"></i><span className='mandatory'>Photos are mandatory</span> </label>
         
        </form>
      </article>
    </>
  );
}

export default AddCollection;
