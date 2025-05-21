'use client';

import Header from '../../components/Header';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('/kopi.jpg')",
      }}
    >
      <Header />

      <div className="pt-32 px-6 md:px-20">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* MENU */}
          <div
            onClick={() => router.push('/Admin/Menu')}
            className="cursor-pointer bg-white bg-opacity-90 text-black p-6 rounded-lg shadow-md hover:shadow-2xl hover:bg-opacity-100 hover:scale-[1.03] transform transition duration-300 ease-in-out group"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-300">🍽️ Menu</h2>
            <p className="group-hover:text-gray-700">Lihat dan kelola daftar menu.</p>
          </div>

          {/* ORDER */}
          <div
            onClick={() => router.push('/Admin/orders')}
            className="cursor-pointer bg-white bg-opacity-90 text-black p-6 rounded-lg shadow-md hover:shadow-2xl hover:bg-opacity-100 hover:scale-[1.03] transform transition duration-300 ease-in-out group"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors duration-300">🧾 Order</h2>
            <p className="group-hover:text-gray-700">Lihat pesanan pelanggan secara real-time.</p>
          </div>

          {/* HISTORY */}
          <div
            onClick={() => router.push('/Admin/history')}
            className="cursor-pointer bg-white bg-opacity-90 text-black p-6 rounded-lg shadow-md hover:shadow-2xl hover:bg-opacity-100 hover:scale-[1.03] transform transition duration-300 ease-in-out group"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">📜 History</h2>
            <p className="group-hover:text-gray-700">Lihat riwayat transaksi dan absensi.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
