import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Button from "../shared/components/common/Button";

const Home: React.FC = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F4F0EF] to-[#FFF]">
      <div className="w-full max-w-xl px-4 sm:max-w-2xl mx-auto text-center flex flex-col gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 font-cormorant">Welcome to BringMeAbroad</h1>
        <p className="text-lg text-gray-700 mb-4 font-inter">
          This is your gateway to international opportunities.
        </p>

        <div className="flex flex-col sm:flex-row sm:gap-6 justify-center">
          {!isSignedIn && (
            <Link to="/signup">
              <Button variant="primary">Get Started</Button>
            </Link>
          )}
        </div>

        {/* Creative hint: Add a small animated arrow for fun */}
        <div className="mt-4 animate-bounce">
          <span className="text-[#03BCA3] text-lg">↓ Scroll down</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
