"use client";
import { useState, useCallback } from "react";

export default function useVerifyPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyPassword = useCallback(async (password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        throw new Error("Incorrect password");
      }

      const data = await res.json();
      return data.ok; // true if password is correct
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { verifyPassword, loading, error };
}
