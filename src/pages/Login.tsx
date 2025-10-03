// Login.tsx
import { Link, useNavigate } from "react-router-dom";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import LoginContainer from "../components/layout/LoginContainer";
import GoogleIcon from "../assets/icons/google.svg";
import { useAppDispatch } from "../hooks";
import { setUser } from "../features/authSlice";
import { loginVariants } from "../lib/styles/login";

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
  const styles = loginVariants();

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

  // Framer Motion animation variants
  const inputVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const buttonVariant = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    // tap: { scale: 0.95, transition: { duration: 0.1 } },
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <LoginContainer>
      <motion.div
        className={styles.container()}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.h1 className={styles.title()} variants={inputVariant}>
          Login
        </motion.h1>

        <motion.div variants={inputVariant} custom={0.1}>
          <Button
            variant="outline"
            className={styles.googleButton()}
            onClick={handleGoogleSignIn}
            disabled={!signIn}
          >
            <img src={GoogleIcon} alt="Google" className={styles.googleIcon()} />
            Login with Google
          </Button>
        </motion.div>

        <div className={styles.dividerContainer()}>
          <div className={styles.dividerLine()}></div>
          <span className={styles.dividerText()}>or</span>
          <div className={styles.dividerLine()}></div>
        </div>

        {errors.server && (
          <motion.p className={styles.errorMessage()} variants={inputVariant}>
            {errors.server}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className={styles.form()}>
          <motion.div className={styles.inputWrapper()} custom={0.2} variants={inputVariant}>
            <Input
              label="E-mail address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              error={errors.email}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </motion.div>
          <motion.div className={styles.inputWrapper()} custom={0.3} variants={inputVariant}>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </motion.div>

          <div className={styles.forgotPasswordWrapper()}>
            <Link to="/forgot-password" className={styles.forgotPasswordLink()}>
              Forgot Password?
            </Link>
          </div>

          <motion.div className={styles.buttonWrapper()} variants={buttonVariant} whileHover="hover" whileTap="tap">
            <Button type="submit" variant="primary" disabled={!signIn}>
              Login
            </Button>
          </motion.div>
        </form>

        <div className={styles.footer()}>
          <p className={styles.footerText()}>Need an account?</p>
          <Link to="/signup" className={styles.signupLink()}>
            <span className={styles.signupText()}>Sign Up</span>
            <ArrowRight className={styles.signupIcon()} />
          </Link>
        </div>
      </motion.div>
    </LoginContainer>
  );
};

export default Login;
