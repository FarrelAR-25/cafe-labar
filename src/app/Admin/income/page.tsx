'use client';

import { useEffect, useState } from 'react';
import { db } from '@/../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface HistoryOrder {
  id: string;
  total: number;
  clearedAt: {
    seconds: number;
  };
}

const isSameDay = (d1: Date, d2: Date) =>
  d1.toDateString() === d2.toDateString();

const isSameWeek = (d1: Date, d2: Date) => {
  const startOfWeek = new Date(d2);
  startOfWeek.setDate(d2.getDate() - d2.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return d1 >= startOfWeek && d1 <= endOfWeek;
};

const isSameMonth = (d1: Date, d2: Date) =>
  d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();

export default function IncomeReportPage() {
  const [historyOrders, setHistoryOrders] = useState<HistoryOrder[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredIncome, setFilteredIncome] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      const q = query(collection(db, 'history'), orderBy('clearedAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as HistoryOrder[];
      setHistoryOrders(data);
    };
    fetchHistory();
  }, []);

  const today = new Date();

  const incomeToday = historyOrders
    .filter(o => isSameDay(new Date(o.clearedAt.seconds * 1000), today))
    .reduce((sum, o) => sum + o.total, 0);

  const incomeThisWeek = historyOrders
    .filter(o => isSameWeek(new Date(o.clearedAt.seconds * 1000), today))
    .reduce((sum, o) => sum + o.total, 0);

  const incomeThisMonth = historyOrders
    .filter(o => isSameMonth(new Date(o.clearedAt.seconds * 1000), today))
    .reduce((sum, o) => sum + o.total, 0);

  const handleFilter = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const income = historyOrders
      .filter(o => {
        const d = new Date(o.clearedAt.seconds * 1000);
        return d >= start && d <= end;
      })
      .reduce((sum, o) => sum + o.total, 0);

    setFilteredIncome(income);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('/kopi.jpg')",
      }}
    >
        <h1 className="text-2xl font-bold text-center mb-6">📊 Laporan Pendapatan</h1>
          <div className="flex justify-center mb-6">
    <button
      onClick={() => router.back()}
      className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
    >
      ⬅ Kembali
    </button>
  </div>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow text-black">
        

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Tanggal Mulai:</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded mt-1"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="font-medium">Tanggal Akhir:</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded mt-1"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-4 mt-2">
            <button
              onClick={handleFilter}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Filter
            </button>
            <button
              onClick={() => window.print()}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 print:hidden"
            >
              Print
            </button>
           
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-100 p-4 rounded">
            <p className="font-medium">💰 Pendapatan Hari Ini:</p>
            <p className="text-lg font-bold">Rp {incomeToday.toLocaleString()}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="font-medium">📆 Pendapatan Minggu Ini:</p>
            <p className="text-lg font-bold">Rp {incomeThisWeek.toLocaleString()}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="font-medium">🗓️ Pendapatan Bulan Ini:</p>
            <p className="text-lg font-bold">Rp {incomeThisMonth.toLocaleString()}</p>
          </div>
          {filteredIncome !== null && (
            <div className="bg-yellow-100 p-4 rounded">
              <p className="font-medium">📅 Pendapatan Custom:</p>
              <p className="text-lg font-bold">Rp {filteredIncome.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
