"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage({ children }: any) {
  const router = useRouter();

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const user = userStorage ? JSON.parse(userStorage) : null;
    const token = user.token;
    
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return children;
}
