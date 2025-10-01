import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import LoginContainer from "../components/layout/LoginContainer";
import { ArrowRight } from "lucide-react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    alert("A password reset link has been sent to your email.");
    navigate("/login");
  };

  return (
    <LoginContainer>
      <div className="w-full md:max-w-md sm:max-w-lg px-5 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 font-cormorant">Forgot Password</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>

        <p className="flex justify-center items-center gap-1 mt-6">
          Back to{" "}
          <Link to="/login" className="flex items-center gap-1 text-black font-semibold underline">
            Login <ArrowRight className="w-5 h-5" />
          </Link>
        </p>
      </div>
    </LoginContainer>
  );
};

export default ForgotPassword;
