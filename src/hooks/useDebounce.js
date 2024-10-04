import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      /* Check if the value is truthy */
      if (value) {
        /* If there is a value update debouncedValue */
        setDebouncedValue(value.trim());
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
