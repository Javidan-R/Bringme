import { ReactNode } from "react";
import rightImg from "../../assets/images/right_img.png";
import BringMeAbroad_Logo from '../../assets/images/BringMeAbroad_Logo.png'
interface LoginContainerProps {
  children: ReactNode;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return (
    <div
      className="flex flex-col min-h-screen md:flex-row"
      style={{
        background:
          "linear-gradient(170deg, #2BD4A273 2%, #D2E0DF 10%, #EEE8E7 60%, #FFD5D5 100%, #FFD5D5 100%)",
      }}
    >
      {/* Left Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:w-1/2 min-h-[50vh] md:min-h-screen">
        {children}
      </div>
      {/* Right Side with Image */}
      <div
  className="hidden md:block md:w-[calc(45%-3rem)] bg-cover bg-center rounded-[.5rem] m-2 relative"
  style={{
    backgroundImage: `url(${rightImg})`,
  }}
>
  {/* Bottom Gradient Overlay */}
  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent rounded-b-xl pointer-events-none" />

  <div className="absolute bottom-10 left-4 z-10">
    <img src={BringMeAbroad_Logo} alt="Bring Me Abroad Logo" className="w-40" />
  </div>
</div>

    </div>
  );
};

export default LoginContainer;