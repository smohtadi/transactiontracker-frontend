import { useState } from "react";

type Val<T> = T | null;
type Ret<T> = [Val<T>, (val: Val<T>) => void];

export default function useLocalStorage<T>(
  key: string,
  defaultValue: Val<T>
): Ret<T> {
  const [storedValue, setStoredValue] = useState<Val<T>>(() => {
    const value = window.localStorage.getItem(key);
    if (value) return JSON.parse(value);
    window.localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  });
  const setValue = (val: Val<T>) => {
    if (val === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(val));
    setStoredValue(val);
  };
  return [storedValue, setValue];
}
