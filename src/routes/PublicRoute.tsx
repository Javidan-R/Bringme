import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectIfAuthenticated?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ 
  children, 
  redirectIfAuthenticated = false 
}) => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn && redirectIfAuthenticated) {
      navigate("/onboarding", { replace: true });
    }
  }, [isLoaded, isSignedIn, redirectIfAuthenticated, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PublicRoute;