import './HomePage.css';
import { theme } from '../../constants/theme';
import logo from '../../assets/images/logo.png';
import { Button } from 'antd';

export const HomePage = () => {
  return (
    <div style={{ backgroundColor: theme.palette.primary }} className="home-page-container">
      <div className="image-container">
        <img className="image-logo" src={logo}></img>
      </div>
      <div className="buttons-container">
        <div className="buttons-little-container">
          <Button size="large" className="button-account">
            Créer un compte
          </Button>
          <Button size="large" className="button-demo">
            Voir la démo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
