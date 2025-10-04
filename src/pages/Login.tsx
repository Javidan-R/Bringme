// src/pages/Login.tsx
import { Link, useNavigate } from "react-router-dom";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../shared/components/common/Button";
import Input from "../shared/components/common/Input";
import LoginContainer from "../modules/Auth/components/LoginContainer";
import GoogleIcon from "../assets/icons/google.svg";
import { useAppDispatch } from "../hooks";
import { loginVariants } from "../modules/Auth/styles/login";
import { ClerkAPIError, ClerkErrorDetail } from "../modules/Auth/types";
import { setUser } from "../modules/Auth/slice";

// Clerk API Xətasını Yoxlama Funksiyası (dəyişməz qalır)
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
  // isPending əlavə edildi
  const { isLoaded, signIn, setActive } = useSignIn(); 
  const { user, isSignedIn } = useUser();
  const dispatch = useAppDispatch();
  const styles = loginVariants();

  // Yüklənmə vəziyyətini idarə edən effekt
  useEffect(() => {
    // isLoaded = Clerk-in yüklənməsi bitib.
    // isSignedIn = İstifadəçi artıq daxil olub.
    if (isLoaded && isSignedIn && user) {
      // İstifadəçi məlumatlarını Redux-a yaz
      dispatch(
        setUser({
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
        })
      );
      // Onboarding səhifəsinə yönləndir
      navigate("/onboarding", { replace: true });
    }
  }, [isLoaded, isSignedIn, user, dispatch, navigate]);


  // Əlavə yüklənmə vəziyyəti: Clerk hook-ları yüklənənə qədər
  if (!isLoaded) {
    return (
      <div className={styles.loadingContainer()}>
        <p className={styles.loadingText()}>Loading...</p>
      </div>
    );
  }
  
  // Validasiya funksiyası
  const validateForm = useCallback(() => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email address";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  }, [email, password]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validateForm();
      
      // Bütün server xətalarını silmək, yalnız validasiya xətalarını göstərmək
      setErrors(prev => ({ ...validationErrors, server: undefined }));

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      if (!signIn) {
        setErrors({
          server: "Login service is not available. Please try again later.",
        });
        return;
      }

      try {
        const result = await signIn.create({ identifier: email, password });

        if (result.status === "complete") {
          // Giriş uğurludur, aktiv sessiyanı təyin et
          if (setActive) await setActive({ session: result.createdSessionId });
          // Yönləndirmə artıq yuxarıdakı useEffect tərəfindən idarə olunur.
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
          // Clerk xətalarını daha dəqiq tut
          serverMessage =
            rawError.errors?.[0]?.message || rawError.message || serverMessage;
        } else if (rawError instanceof Error) {
            serverMessage = rawError.message;
        }
        setErrors({ server: serverMessage });
      }
    },
    [email, password, validateForm, signIn, setActive]
  );

  const handleGoogleSignIn = useCallback(async () => {
    // Server xətasını sıfırla
    setErrors(prev => ({ ...prev, server: undefined }));
    
    if (!signIn) {
      setErrors({
        server: "Login service is not available. Please try again later.",
      });
      return;
    }
    
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        // Hər iki redirectUrl onboarding-ə yönləndirir
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
  }, [signIn]);

  // Framer Motion animation variants
  const inputVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };


  // Yeni: Giriş düyməsi üçün ayrı variant
  const loginButtonVariant = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4 } },
  };

  const isDisabled = !signIn;

  return (
    <LoginContainer>
      <motion.div
        className={styles.container()}
        initial="hidden"
        // 'isPending' istifadə olunaraq əlavə disabled vəziyyəti idarə oluna bilər.
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
            disabled={isDisabled} // Yeni: isDisabled istifadə olunur
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
          {/* Email input: trim() yalnız burada tətbiq olunur */}
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
          
          {/* Password input: trim() SİLİNDİ */}
          <motion.div className={styles.inputWrapper()} custom={0.3} variants={inputVariant}>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // YALNIZ setPassword(e.target.value)
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

          <motion.div 
            className={styles.buttonWrapper()} 
            variants={loginButtonVariant} // Yeni, sadə variant
            initial="initial"
            animate="animate"
            whileHover="hover" 
            whileTap="tap"
          >
            <Button type="submit" variant="primary" disabled={isDisabled}>
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