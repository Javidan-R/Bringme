// src/modules/Onboarding/hooks/useStepForm.ts
import { useCallback, useEffect, useRef, useState } from "react";

type Validator<T> = (data: T) => Partial<Record<keyof T, string | undefined>>;

interface UseStepFormOptions<T> {
  initialData: T;
  validate?: Validator<T>;
  save: (data: T) => Promise<any> | any; // dispatch action or API call
  onNext?: () => void;
  onPrevious?: () => void;
  // Optional features:
  persistKey?: string; // localStorage key for persisting partial form
  autosave?: boolean;
  autosaveDelay?: number; // ms debounce
  stepId?: string | number; // for time tracking/logging
  onSaved?: (data: T) => void; // callback after successful save
}

export function useStepForm<T extends Record<string, any>>(opts: UseStepFormOptions<T>) {
  const {
    initialData,
    validate,
    save,
    onNext,
    onPrevious,
    persistKey,
    autosave = false,
    autosaveDelay = 500,
    stepId,
    onSaved,
  } = opts;

  // If persistKey provided, try hydrate
  const hydrate = useRef<T | null>(null);
  if (hydrate.current === null && typeof window !== "undefined" && persistKey) {
    try {
      const raw = localStorage.getItem(persistKey);
      if (raw) hydrate.current = JSON.parse(raw) as T;
    } catch {
      hydrate.current = null;
    }
  }

  const [data, setData] = useState<T>(() => (hydrate.current ? { ...initialData, ...(hydrate.current as T) } : { ...initialData }));
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeSpent, setTimeSpent] = useState<number>(0); // ms

  const timerStartRef = useRef<number | null>(Date.now());
  const autosaveTimerRef = useRef<number | null>(null);

  // Start/Restart timer when stepId or hook mounts
  useEffect(() => {
    timerStartRef.current = Date.now();
    return () => {
      // on unmount accumulate elapsed
      const start = timerStartRef.current;
      if (start) {
        setTimeSpent((prev) => prev + (Date.now() - start));
        timerStartRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepId]);

  // Autosave (debounced) to localStorage if enabled
  useEffect(() => {
    if (!autosave || !persistKey) return;
    if (autosaveTimerRef.current) {
      window.clearTimeout(autosaveTimerRef.current);
    }
    autosaveTimerRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(persistKey, JSON.stringify(data));
      } catch {
        // ignore
      }
    }, autosaveDelay);
    return () => {
      if (autosaveTimerRef.current) window.clearTimeout(autosaveTimerRef.current);
    };
  }, [autosave, autosaveDelay, data, persistKey]);

  const setField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }, []);

  const setArrayField = useCallback(<K extends keyof T>(field: K, value: any[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const addArrayItem = useCallback(<K extends keyof T>(field: K, item: any) => {
    setData((prev) => {
      const arr = Array.isArray(prev[field]) ? [...prev[field]] : [];
      arr.push(item);
      return { ...prev, [field]: arr } as T;
    });
  }, []);

  const removeArrayItem = useCallback(<K extends keyof T>(field: K, index: number) => {
    setData((prev) => {
      const arr = Array.isArray(prev[field]) ? [...prev[field]] : [];
      if (index >= 0 && index < arr.length) arr.splice(index, 1);
      return { ...prev, [field]: arr } as T;
    });
  }, []);

  const validateAll = useCallback(() => {
    if (!validate) return {};
    const v = validate(data) || {};
    setErrors(v as any);
    return v;
  }, [data, validate]);

  const validateField = useCallback((field: keyof T) => {
    if (!validate) return null;
    const res = validate(data)[field] as string | undefined;
    if (res) setErrors((prev) => ({ ...prev, [field]: res }));
    return res || null;
  }, [data, validate]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    const validationErrors = validateAll();
    if (validationErrors && Object.keys(validationErrors).length > 0) {
      // mark all as touched
      const touchedAll: Partial<Record<keyof T, boolean>> = {};
      (Object.keys(data) as (keyof T)[]).forEach((k) => (touchedAll[k] = true));
      setTouched((prev) => ({ ...prev, ...touchedAll }));
      return;
    }

    setIsSubmitting(true);
    // accumulate time so far
    const start = timerStartRef.current;
    if (start) {
      setTimeSpent((prev) => prev + (Date.now() - start));
      timerStartRef.current = Date.now();
    }

    try {
      await save(data);
      // optionally persist cleared saved snapshot (or remove)
      if (persistKey) {
        try {
          localStorage.removeItem(persistKey);
        } catch {}
      }
      if (onSaved) onSaved(data);
      if (onNext) onNext();
    } finally {
      setIsSubmitting(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, save, validateAll, isSubmitting, onNext, persistKey, onSaved]);

  const handlePrevious = useCallback(() => {
    // optionally save current snapshot before previous
    if (onPrevious) onPrevious();
  }, [onPrevious]);

  return {
    data,
    setData,
    setField,
    setArrayField,
    addArrayItem,
    removeArrayItem,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handlePrevious,
    validateField,
    validateAll,
    timeSpent,
  };
}
