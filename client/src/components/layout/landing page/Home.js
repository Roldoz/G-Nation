import { motion } from "framer-motion";
import "./home.css";
import{Link} from 'react-router-dom'
import img1 from './images/4.jpg'


function Home() {
  return (
    <>
      <div className="containerhome">
        

        <div className="row">
          <motion.div
            className="col-1"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration:0.4, delay: 1}}>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration:0.4,delay: 2}}>
              GAMING BRINGS PEOPLE TOGETHER.
              
            </motion.h1>
           
            <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration:0.4, delay: 3}}>
              Our goal is to deliver an incredibly fun and compelling social experience that will give gamers more than what they've been waiting for, and show a whole new generation how much fun it is to live the life of a gamer.</motion.p>
            <motion.div 
             initial={{ opacity: 0, x: 200 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ type: 'spring',duration:0.7, delay: 4}}>
               <Link to='/register'>
            <motion.button
            whileHover={{ x:6 }}
           >
              Join Us 
              {/* <img src={arrow} /> */}
            </motion.button></Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="col-2"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2,duration:0.4}}
          >
            
              <img src={img1} />
            
           
          </motion.div>
        </div>
        <motion.div className="social-links"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4,delay:5}}>
        <i class="fab fa-facebook-square fa-2x"></i>
        <i class="fab fa-instagram fa-2x"></i>
         <i class="fab fa-twitter fa-2x"></i>
        </motion.div>
    
      </div>
   
    </>
  );
}

export default Home;
