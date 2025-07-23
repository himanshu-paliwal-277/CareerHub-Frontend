"use client";
import { useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";

type QueryParams = Record<string, string | number | undefined>;

export function useQueryParamsState<T extends QueryParams>(defaultValues: T) {
  const [values, setValues] = useState<T>(() => {
    const url = new URL(window.location.href);
    const initialValues = { ...defaultValues };

    Object.entries(defaultValues).forEach(([key, defaultVal]) => {
      const urlValue = url.searchParams.get(key);
      if (urlValue !== null) {
        // Convert to number if default is a number
        initialValues[key as keyof T] = (
          typeof defaultVal === "number" ? parseInt(urlValue, 10) : urlValue
        ) as T[keyof T];
      }
    });

    return initialValues;
  });

  const debouncedUpdate = useDebouncedCallback((updates: Partial<T>) => {
    const url = new URL(window.location.href);
    let shouldUpdate = false;

    Object.entries(updates).forEach(([key, value]) => {
      const current = url.searchParams.get(key);
      if (value !== undefined && String(current) !== String(value)) {
        url.searchParams.set(key, String(value));
        shouldUpdate = true;
      }
    });

    if (!shouldUpdate) return;

    window.history.replaceState(
      {},
      "",
      `${url.pathname}?${url.searchParams.toString()}`
    );

    setValues((prev) => ({
      ...prev,
      ...updates,
    }));
  }, 0);

  const setQueryParams = (updates: Partial<T>) => {
    debouncedUpdate(updates);
  };

  return {
    query: values,
    setQueryParams,
  };
}
