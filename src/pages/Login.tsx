import { Link, useNavigate } from "react-router-dom";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import LoginContainer from "../components/layout/LoginContainer";
import { ArrowRight } from "lucide-react";
import GoogleIcon from "../assets/icons/google.svg";
import { useAppDispatch } from "../hooks";
import { setUser } from "../features/authSlice";

interface ClerkErrorDetail {
  message: string;
  longMessage?: string;
  code?: string;
}

interface ClerkAPIError {
  errors?: ClerkErrorDetail[];
  message?: string;
}

function isClerkAPIError(error: unknown): error is ClerkAPIError {
  if (typeof error !== "object" || error === null) return false;
  const err = error as ClerkAPIError;
  return (
    (Array.isArray(err.errors) &&
      err.errors.every(
        (e) =>
          typeof e === "object" &&
          e !== null &&
          typeof (e as ClerkErrorDetail).message === "string"
      )) ||
    typeof err.message === "string"
  );
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    server?: string;
  }>({});
  const navigate = useNavigate();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user, isSignedIn } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      dispatch(
        setUser({
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
        })
      );
      navigate("/onboarding");
    }
  }, [isLoaded, isSignedIn, user, dispatch, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-brand-login-bgStart to-brand-login-bgEnd">
        <p className="text-lg text-brand-login-text font-inter">Loading...</p>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email address";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    if (!signIn) {
      setErrors({
        server: "Login service is not available. Please try again later.",
      });
      return;
    }

    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        if (setActive) await setActive({ session: result.createdSessionId });
        else
          setErrors({
            server: "Failed to activate session. Please try again.",
          });
      } else if (
        result.status === "needs_first_factor" ||
        result.status === "needs_second_factor"
      ) {
        setErrors({
          server:
            "Multi-factor authentication is required. Please complete the additional steps.",
        });
      } else {
        setErrors({
          server: "Login failed. Please check your credentials or try again.",
        });
      }
    } catch (rawError: unknown) {
      let serverMessage = "An error occurred during login. Please try again.";
      if (isClerkAPIError(rawError)) {
        serverMessage =
          rawError.errors?.[0]?.message || rawError.message || serverMessage;
      } else if (rawError instanceof Error) serverMessage = rawError.message;
      setErrors({ server: serverMessage });
    }
  };

  const handleGoogleSignIn = async () => {
    if (!signIn) {
      setErrors({
        server: "Login service is not available. Please try again later.",
      });
      return;
    }
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/onboarding",
        redirectUrlComplete: "/onboarding",
      });
    } catch (rawError: unknown) {
      let serverMessage = "Failed to sign in with Google. Please try again.";
      if (isClerkAPIError(rawError)) {
        serverMessage =
          rawError.errors?.[0]?.message || rawError.message || serverMessage;
      } else if (rawError instanceof Error) serverMessage = rawError.message;
      setErrors({ server: serverMessage });
    }
  };

  return (
    <LoginContainer>
      <div className="w-full md:max-w-lg sm:max-w-lg px-5 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 font-cormorant">Login</h1>

        {/* Google Button */}
        <Button
          variant="outline"
          className="flex items-center justify-center w-full gap-3 mb-6 rounded-lg border border-white bg-white hover:bg-gray-100"
          onClick={handleGoogleSignIn}
          disabled={!signIn}
        >
          <img src={GoogleIcon} alt="Google" className="w-5 h-5 mr-2" />
          Login with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6 w-full">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="text-gray-500 font-light text-base">or</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {/* Server Error */}
        {errors.server && (
          <p className="text-sm text-red-500 mb-4 text-center">{errors.server}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <Input
            label="E-mail address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            error={errors.email}
            className="mb-4 w-full"
            placeholder="Enter your email"
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            className="mb-4 w-full"
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          <div className="text-left mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-black font-semibold underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex justify-center items-center my-6">
            <Button type="submit" variant="primary" disabled={!signIn}>
              Login
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="flex flex-row items-center justify-center gap-3 mt-8">
          <p className="text-sm text-black font-semibold text-center">Need an account?</p>
          <Link to="/signup" className="flex items-center gap-1">
            <span className="text-black font-medium text-base underline">Sign Up</span>
            <ArrowRight className="w-5 h-5 text-black" />
          </Link>
        </div>
      </div>
    </LoginContainer>
  );
};

export default Login;
