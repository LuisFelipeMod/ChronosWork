"use client"

import useAuthRedirect from '@/hooks/useAuthRedirect';
import router from "next/router";

const handleLogout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};


export default function HomePage() {
  useAuthRedirect();

  return (
    <div>
    </div>
  );
}
