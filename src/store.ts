// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/Auth/slice";
import onboardingReducer from "./modules/Onboarding/slice";
import stepReducer from './modules/Checkout/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
    stepForm: stepReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for Clerk user objects if needed
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
