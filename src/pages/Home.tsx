import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Button from "../components/common/Button";

const Home: React.FC = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F4F0EF] to-[#FFF]">
      <div className="w-full max-w-[28rem] px-4 sm:max-w-[28rem] mx-auto text-center">
        <h1
          className="text-3xl font-bold mb-6 sm:text-4xl sm:mb-8"
          style={{ fontFamily: "Cormorant" }}
        >
          Welcome to BringMeAbroad
        </h1>
        <p
          className="text-lg mb-6"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          This is a placeholder for the BringMeAbroad homepage.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center mb-6">
          {!isSignedIn && (
            <>

              <Link to="/signup">
                <Button variant="primary">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;