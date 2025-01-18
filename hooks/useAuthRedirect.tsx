import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuthRedirect() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const userStorage = localStorage.getItem("user");
    const user = userStorage ? JSON.parse(userStorage) : null;
    const token = user?.token;

    if (token) {
      setIsAuthenticated(true);
      router.push("/activities");
    } else {
      setIsAuthenticated(false);
      router.push("/login");
    }
  }, [isClient, router]);

  return isAuthenticated;
}
