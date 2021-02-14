import {useState} from 'react';
import{useDispatch} from 'react-redux';
import './addForm.css';
import {addComment} from '../../js/actions/collection'

function AddComment({collectionId}) {

    const dispatch = useDispatch()
    const [text, setText] = useState("");
    const handleSubmit = e =>{
        
            e.preventDefault()
        dispatch(addComment(collectionId,{text}))
        setText('') 
        
       
    }

    return (
        <>
        <article className="addCom">
            <form 
            className='addForm'
            onSubmit={handleSubmit}
           
            >
<textarea 
className='textCom'
name='text'
value={text}
placeholder='Add a comment..'
onChange={e=> setText(e.target.value)}
>
</textarea>
<button className='butCol' type='submit'> Add </button>
            </form>
            </article>  
      </>
    )
}

export default AddComment
