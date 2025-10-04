import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginContainer from "../modules/Auth/components/LoginContainer";
import Input from "../shared/components/common/Input";
import Button from "../shared/components/common/Button";
import { ArrowRight } from "lucide-react";
import { form } from "../lib/styles/ui";

const { primaryButton } = form();

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email address");
    alert("A password reset link has been sent to your email.");
    navigate("/login");
  };

  return (
    <LoginContainer>
      <div className="w-full md:max-w-md sm:max-w-lg px-5 flex flex-col items-center gap-4">
        <h1 className="text-4xl font-cormorant font-bold mb-4">Forgot Password</h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <Button type="submit" className={primaryButton()}>
            Send Reset Link
          </Button>
        </form>

        <p className="flex justify-center items-center gap-1 mt-6 text-sm">
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
