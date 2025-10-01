import { Link, useNavigate } from "react-router-dom";
import { useSignUp, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import LoginContainer from "../components/layout/LoginContainer";
import Checkbox from "../components/common/Checkbox";
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
  if (typeof error !== 'object' || error === null) return false;
  const err = error as ClerkAPIError; 
  return (
    (Array.isArray(err.errors) &&
      err.errors.every(
        (e) => typeof e === 'object' && e !== null && typeof (e as ClerkErrorDetail).message === 'string'
      )) ||
    typeof err.message === 'string'
  );
}

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [newsUpdates, setNewsUpdates] = useState(false);
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  // NEW STATE: To show success message after resending code, replacing alert()
  const [resendSuccess, setResendSuccess] = useState(false); 
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    code?: string;
    server?: string;
  }>({});

  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user, isSignedIn } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSignedIn && user) {
      dispatch(
        setUser({
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
        })
      );
      navigate("/onboarding");
    }
  }, [isSignedIn, user, dispatch, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium">
        <p>Loading...</p>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      terms?: string;
    } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!termsAgreed) {
      newErrors.terms = "You must agree to the Terms of Service and Privacy Policy";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      if (result.status === "missing_requirements") {
        await signUp.prepareEmailAddressVerification();
        setVerifying(true);
      } else {
        setErrors({ server: "Unexpected sign-up status. Please try again." });
      }
    } catch (rawError: unknown) {
      let serverMessage = "An error occurred during sign-up. Please try again.";
      if (isClerkAPIError(rawError)) {
        if (rawError.errors && rawError.errors.length > 0 && rawError.errors[0].message) {
          serverMessage = rawError.errors[0].message;
        } else if (rawError.message) {
          serverMessage = rawError.message;
        }
      } else if (rawError instanceof Error) {
        serverMessage = rawError.message;
      }
      setErrors({ server: serverMessage });
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      setErrors({ code: "Verification code is required" });
      return;
    }

    setErrors({});

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        await setActive({ session: signUp.createdSessionId });
        // Redirection will be handled by the useEffect hook
      } else {
        setErrors({ server: "Verification failed. Please try again." });
      }
    } catch (rawError: unknown) {
      let codeMessage = "Invalid verification code. Please try again.";
      if (isClerkAPIError(rawError)) {
        if (rawError.errors && rawError.errors.length > 0 && rawError.errors[0].message) {
          codeMessage = rawError.errors[0].message;
        } else if (rawError.message) {
          codeMessage = rawError.message;
        }
      } else if (rawError instanceof Error) {
        codeMessage = rawError.message;
      }
      setErrors({ code: codeMessage });
    }
  };
  
  // New handler for resending the code, replacing alert()
  const handleResendCode = async () => {
    setErrors({});
    setResendSuccess(false); 
    try {
      await signUp.prepareEmailAddressVerification();
      setResendSuccess(true);
      // Clear success message after 5 seconds
      setTimeout(() => setResendSuccess(false), 5000); 
    } catch (e) { 
      let serverMessage = "Failed to resend code. Please try again.";
      if (isClerkAPIError(e)) {
        if (e.errors && e.errors.length > 0 && e.errors[0].message) {
          serverMessage = e.errors[0].message;
        } else if (e.message) {
          serverMessage = e.message;
        }
      }
      setErrors({ server: serverMessage });
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/onboarding",
        redirectUrlComplete: "/onboarding",
      });
    } catch {
      setErrors({
        server: "Failed to sign up with Google. Please try again.",
      });
    }
  };

  if (verifying) {
    return (
      <LoginContainer>
        <div className="w-full max-w-sm md:max-w-lg px-[1.12rem] mx-auto">
          <h1 className="text-3xl font-cormorant font-bold mb-4 text-gray-800">Verify Your Email</h1>
          <p className="text-gray-600 mb-6">
            We’ve sent a verification code to **{email}**. Please enter it below.
          </p>
          
          {/* Success Message for Resend */}
          {resendSuccess && (
            <div className="p-3 bg-green-100 text-green-700 rounded-lg mb-4 text-sm font-medium">
              A new verification code has been successfully sent to your email.
            </div>
          )}

          {errors.server && (
            <p className="text-red-500 bg-red-50 p-3 rounded-lg mb-4 text-sm font-medium">{errors.server}</p>
          )}
          
          <form onSubmit={handleVerify}>
            <Input
              label="Verification Code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.trim())}
              error={errors.code}
              className="mb-4"
              placeholder="Enter the 6-digit code"
            />
            <div className="mt-8">
              <Button type="submit" variant="primary">Verify</Button>
            </div>
          </form>
          
          <div className="mt-6 flex items-center justify-center gap-2">
            <p className="text-sm text-gray-600">
              Didn’t receive the code?{" "}
            </p>
            <button
              onClick={handleResendCode}
              className="text-[#03BCA3] hover:text-[#02A08A] font-semibold text-sm transition duration-150"
            >
              Resend Code
            </button>
          </div>
        </div>
      </LoginContainer>
    );
  }

  return (
    <LoginContainer>
      <div className="w-full max-w-sm md:max-w-lg px-[1.12rem] mx-auto">
        <h1 className="text-5xl font-cormorant font-bold mb-8 text-gray-800">Sign Up</h1>
        <Button
          variant="outline"
          className="w-full h-[3.5rem] rounded-[1.5rem] flex items-center justify-center mb-6 border-gray-300 text-lg"
          onClick={handleGoogleSignUp}
        >
          {/* Using a placeholder for Google Icon since the asset path is unknown */}
          <img src={GoogleIcon} alt="Google" className="w-5 h-5 mr-3" />
          <span className="text-gray-700 font-medium">Sign Up with Google</span>
        </Button>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="text-sm font-medium text-gray-500 uppercase">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        {errors.server && (
          <p className="text-red-500 bg-red-50 p-3 rounded-lg mb-4 text-sm font-medium">{errors.server}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="E-mail address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            error={errors.email}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="Enter your password"
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />
          <div className="pt-2">
            <Checkbox
              label="I agree to the Terms of Service and Privacy Policy."
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="mb-2"
            />
            {errors.terms && (
              <p className="text-xs text-red-500 mt-1">{errors.terms}</p>
            )}
            <Checkbox
              label="Keep me up to date on news and information."
              checked={newsUpdates}
              onChange={(e) => setNewsUpdates(e.target.checked)}
              className="mt-2"
            />
          </div>
          <div className="pt-6 flex justify-center">
            <Button type="submit" variant="primary">Sign Up</Button>
          </div>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-black hover:text-gray-800 transition duration-150 font-bold ml-1 flex items-center justify-center gap-1">
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </LoginContainer>
  );
};

export default SignUp
