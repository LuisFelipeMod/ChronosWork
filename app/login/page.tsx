'use client';
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DOMAttributes } from '@nextui-org/system';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e:DOMAttributes<HTMLFormElement>) => {
    e.preventDefault();
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ method: "PUT", username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.username);
      router.push('/');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <form className='flex flex-col w-full justify-center items-center' onSubmit={handleLogin}>
      <h1 className='text-white text-2xl mb-5'>
        Login
      </h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuário"
        className='rounded m-2 h-10 p-2 w-6/12'
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        className='rounded m-2 h-10 p-2 w-6/12'

      />
      <button type="submit" className='mt-1 bg-white pt-2 pb-2 pl-5 pr-5 rounded text-black'>Login</button>
    </form>
  );
}
