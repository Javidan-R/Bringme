// src/components/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
// Clerk'in useUser hook'unun importu saxlanılır
import { useUser } from "@clerk/clerk-react"; 

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Clerk hook'undan isLoaded və isSignedIn statusları əldə edilir.
  const { isLoaded, isSignedIn } = useUser(); 

  // Clerk hook'unun ilkin yüklənməsi tamamlanana qədər yüklənmə statusu göstərilir.
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  // Yüklənmə tamamlandıqda və istifadəçi daxil OLMAYANDA, 'login' marşrutuna yönləndirilir.
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // Yüklənmə tamamlandıqda və istifadəçi daxil OLDUQDA, marşrut render edilir.
  return <>{children}</>;
};

export default ProtectedRoute;