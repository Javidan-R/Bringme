import rightImg from "../../../assets/images/right_img.png";
import BringMeAbroad_Logo from '../../../assets/images/BringMeAbroad_Logo.png';
import { layout } from "../../../lib/styles/ui";
import { LoginContainerProps } from "../../../types/components";

const { loginContainer, left, rightImageWrapper, rightOverlay, logoWrapper, logoImage } = layout();



const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return (
    <div
      className={loginContainer()}
      style={{
        background:
          "linear-gradient(170deg, #2BD4A273 2%, #D2E0DF 10%, #EEE8E7 60%, #FFD5D5 100%, #FFD5D5 100%)",
      }}
    >
      <div className={left()}>{children}</div>
      <div
        className={rightImageWrapper()}
        style={{ backgroundImage: `url(${rightImg})` }}
      >
        <div className={rightOverlay()} />
        <div className={logoWrapper()}>
          <img src={BringMeAbroad_Logo} alt="Logo" className={logoImage()} />
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
