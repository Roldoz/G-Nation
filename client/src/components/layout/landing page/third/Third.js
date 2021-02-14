import './style.css'
import { motion } from "framer-motion";

function Third() {
    return (
        <div className='contain'>
           <motion.div className='topleft' 
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.4,delay:6}}>
               </motion.div> 
              
               <motion.div className='topright'
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{duration: 0.4,delay:6}}
               >
               <h1> Share your reviews with gamers all over the world.</h1>
               </motion.div> 
                <motion.div className='downleft' 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4,delay:7}}
               >
               <h1> Have a great collection !! Share it with us</h1>
               </motion.div> 
               <motion.div className='downright'
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.4,delay:7}} >
               
               </motion.div> 

        </div>
    )
}

export default Third
