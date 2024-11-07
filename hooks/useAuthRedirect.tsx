
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useAuthRedirect() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      router.push('/activities');
    } else {
      setIsAuthenticated(false);
      router.push('/login');
    }
  }, [router]);

  return isAuthenticated;
}
