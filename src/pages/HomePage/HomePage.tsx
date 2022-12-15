import './HomePage.css';
import { theme } from '../../constants/theme';
import logo from '../../assets/images/logo.png';
import { Button } from 'antd';
import { motion } from 'framer-motion';

export const HomePage = () => {
  return (
    <div style={{ backgroundColor: theme.palette.primary }} className="home-page-container">
      <motion.div className="image-container">
        <motion.div
          animate={{
            rotate: [0, 9, -9, 0]
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            times: [0, 10, 1, 0],
            delay: 0.8,
            dumping: 1,
            stiffness: 1
          }}>
          <img className="image-logo" src={logo}></img>
        </motion.div>
      </motion.div>
      <div className="buttons-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          }}
          drag
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50
          }}
          className="buttons-little-container">
          <Button size="large" className="button-account">
            Créer un compte
          </Button>
          <Button size="large" className="button-demo">
            Voir la démo
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
