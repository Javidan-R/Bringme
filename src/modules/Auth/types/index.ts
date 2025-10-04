
export interface ClerkErrorDetail {
  message: string;
  longMessage?: string;
  code?: string;
}

export interface ClerkAPIError {
  errors?: ClerkErrorDetail[];
  message?: string;
}


export interface AuthState {
  userId: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

