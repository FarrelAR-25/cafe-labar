'use client';

import { useEffect, useState } from 'react';
import { db } from '@/../firebase';
import { useRouter } from 'next/navigation';
import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
} from 'firebase/firestore';

interface MenuItem {
  name: string;
  price: number;
}

interface HistoryOrder {
  id: string;
  orderNumber: string | number;
  customerName: string;
  menus: MenuItem[];
  total: number;
  clearedAt: any; // Firebase timestamp
}

export default function HistoryPage() {
  const [historyOrders, setHistoryOrders] = useState<HistoryOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  useEffect(() => {
    fetchHistoryOrders();
  }, []);

  const fetchHistoryOrders = async () => {
    const q = query(collection(db, 'history'), orderBy('clearedAt', 'desc'));
    const snapshot = await getDocs(q);
    const historyData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as HistoryOrder[];
    setHistoryOrders(historyData);
  };

  const handleClearHistory = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus semua riwayat pesanan?')) return;

    setLoading(true);
    const snapshot = await getDocs(collection(db, 'history'));
    const deletePromises = snapshot.docs.map((docu) => deleteDoc(doc(db, 'history', docu.id)));
    await Promise.all(deletePromises);
    setHistoryOrders([]);
    setLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-6 print:bg-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(105, 79, 60, 0.85),rgba(0, 0, 0, 0.85), rgba(88, 56, 17, 0.85)), url('/kopi.jpg')",
      }}
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-black print:text-black">
        Riwayat Pesanan
      </h1>

      <div className="flex justify-center gap-4 mb-6 print:hidden">
          <button
    onClick={() => router.back()}
    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
  >
    ⬅ Kembali
  </button>
        <button
          onClick={handleClearHistory}
          disabled={loading}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          {loading ? 'Menghapus...' : 'Clear History'}
        </button>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Print Laporan
        </button>
      </div>

      {historyOrders.length === 0 ? (
        <p className="text-center text-black">Belum ada riwayat pesanan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {historyOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded shadow-md p-6 text-black break-inside-avoid print:shadow-none print:border print:border-black"
            >
              <h2 className="text-xl font-semibold mb-2">
                No. Pesanan: {order.orderNumber}
              </h2>
              <p className="mb-1 font-medium">Pemesan: {order.customerName}</p>
              <p className="mb-1 font-medium">Menu yang dipesan:</p>
              <ul className="list-disc list-inside mb-2">
                {(order.menus ?? []).map((menu, index) => (
                  <li key={index}>
                    {menu.name} - Rp {menu.price.toLocaleString()}
                  </li>
                ))}
              </ul>
              <p className="font-semibold mb-2">
                Total Harga: Rp {order.total.toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">
                Waktu Clear:{' '}
                {order.clearedAt
                  ? new Date(order.clearedAt.seconds * 1000).toLocaleString()
                  : '-'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
