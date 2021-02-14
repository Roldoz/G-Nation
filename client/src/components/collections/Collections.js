import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getCollections} from '../../js/actions/collection';
import Spinner from '../style/Spinner';
import AddCollection from './AddCollection';
import SingleCollection from './SingleCollection';
import FlipMove from 'react-flip-move';
import {motion} from 'framer-motion';

function Collections() {

  // const collection = useSelector(state => state.collection);
  const collections = useSelector(state=>state.collection.collections);
  const loading = useSelector(state=>state.collection.loading);
  const dispatch = useDispatch();

useEffect(() => {
 dispatch(getCollections())
}, [getCollections])

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
       loading ? (<Spinner/> ): (<motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}>
      
<div className='collections'style={{margin:'8% auto'}}>
<AddCollection />
<FlipMove  staggerDurationBy={220} enterAnimation="fade" leaveAnimation="fade" >
{collections.map(collection=>(
<SingleCollection key={collection._id} collection={collection} />
))}
</FlipMove>
</div>



       </motion.div>)
    )
}

export default Collections
