'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'LabarEnak' && password === 'Labar123') {
      router.push('/Admin/dashboard');
    } else {
      setError('Username atau Password salah');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('/kopi.jpg')"
      }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold text-center text-[#7b4b2a] mb-6">Login Admin</h2>
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-black w-full p-3 mb-4 border rounded focus:outline-none focus:ring focus:ring-yellow-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black w-full p-3 mb-6 border rounded focus:outline-none focus:ring focus:ring-yellow-300"
        />
        <button
          type="submit"
          className="w-full bg-[#7b4b2a] text-white py-2 rounded hover:bg-[#5e3920] transition"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
