'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/../firebase';
import { useRouter } from 'next/navigation';
import { FaLock } from 'react-icons/fa';

const ADMIN_UID = 'e5muhuSIp7g77GBN10TuLT0YVM22';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.uid !== ADMIN_UID) {
        await signOut(auth);
        setError('Akun ini tidak memiliki akses admin.');
        return;
      }

      localStorage.setItem('isAdmin', 'true');
      router.push('/Admin/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Email atau password salah!');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,130,34,0.6), rgba(4,16,37,0.8)), url('/kopi.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <FaLock className="text-2xl text-[#7b4b2a]" />
        </div>
        <h1 className="text-2xl font-bold text-center text-[#7b4b2a] mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="text-black w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="text-black w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#7b4b2a] hover:bg-[#5a3820] text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
