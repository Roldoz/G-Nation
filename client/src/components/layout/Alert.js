import {useSelector} from 'react-redux';
import {motion} from 'framer-motion';



function Alert() {
  const alert = useSelector(state => state.alert)

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
    
    alert !== null &&
alert.length > 0 &&
alert.map(al =>( 
     <motion.div 
     initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
     key={al.id} className={`alert alert-${al.alertType} `}> 
       {al.msg}
      </motion.div>
                    ))
  )
}




export default Alert;