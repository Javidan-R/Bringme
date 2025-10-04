import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignUp, useUser } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";

import Button from "../shared/components/common/Button";
import Input from "../shared/components/common/Input";
import LoginContainer from "../modules/Auth/components/LoginContainer";
import GoogleIcon from "../assets/icons/google.svg";
import { useAppDispatch } from "../hooks";
import { signupVariants } from "../modules/Auth/styles/signup";
import { ClerkAPIError, ClerkErrorDetail } from "../modules/Auth/types";
import { setUser } from "../modules/Auth/slice";


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

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user, isSignedIn } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; server?: string }>({});

  const styles = signupVariants();

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
      <div className={styles.loadingContainer()}>
        <p className={styles.loadingText()}>Loading...</p>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
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
    if (!signUp) {
      setErrors({ server: "Sign up service is not available. Please try again later." });
      return;
    }

    try {
      const result = await signUp.create({ emailAddress: email, password });
      if (result.status === "complete") {
        if (setActive) await setActive({ session: result.createdSessionId });
      } else {
        setErrors({ server: "Sign up incomplete. Please try again." });
      }
    } catch (rawError: unknown) {
      let serverMessage = "An error occurred during sign up. Please try again.";
      if (isClerkAPIError(rawError)) {
        serverMessage = rawError.errors?.[0]?.message || rawError.message || serverMessage;
      } else if (rawError instanceof Error) serverMessage = rawError.message;
      setErrors({ server: serverMessage });
    }
  };

  const handleGoogleSignUp = async () => {
    if (!signUp) {
      setErrors({ server: "Sign up service is not available. Please try again later." });
      return;
    }
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/onboarding",
        redirectUrlComplete: "/onboarding",
      });
    } catch (rawError: unknown) {
      let serverMessage = "Failed to sign up with Google. Please try again.";
      if (isClerkAPIError(rawError)) {
        serverMessage = rawError.errors?.[0]?.message || rawError.message || serverMessage;
      } else if (rawError instanceof Error) serverMessage = rawError.message;
      setErrors({ server: serverMessage });
    }
  };

  return (
    <LoginContainer>
      <div className={styles.container()}>
        <h1 className={styles.title()}>Sign Up</h1>

        <Button
          variant="outline"
          className={styles.googleButton()}
          onClick={handleGoogleSignUp}
          disabled={!signUp}
        >
          <img src={GoogleIcon} alt="Google" className={styles.googleIcon()} />
          Sign Up with Google
        </Button>

        <div className={styles.dividerContainer()}>
          <div className={styles.dividerLine()}></div>
          <span className={styles.dividerText()}>or</span>
          <div className={styles.dividerLine()}></div>
        </div>

        {errors.server && <p className={styles.errorMessage()}>{errors.server}</p>}

        <form onSubmit={handleSubmit} className={styles.form()}>
          <div className={styles.inputWrapper()} style={{ animationDelay: "100ms" }}>
            <Input
              label="E-mail address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              error={errors.email}
              className="w-full"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <div className={styles.inputWrapper()} style={{ animationDelay: "200ms" }}>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              className="w-full"
              placeholder="Enter your password"
              autoComplete="new-password"
            />
          </div>

          <div className={styles.buttonWrapper()}>
            <Button type="submit" variant="primary" disabled={!signUp}>
              Sign Up
            </Button>
          </div>
        </form>

        <div className={styles.footer()}>
          <p className={styles.footerText()}>Already have an account?</p>
          <Link to="/login" className={styles.loginLink()}>
            <span className={styles.loginText()}>Log In</span>
            <ArrowRight className={styles.loginIcon()} />
          </Link>
        </div>
      </div>
    </LoginContainer>
  );
};

export default SignUp;
