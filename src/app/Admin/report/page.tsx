'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/../firebase';
import { useRouter } from 'next/navigation';

type Report = {
  id: string;
  nama: string;
  rating: string;
  review: string;
  suggestion: string;
  createdAt: {
    toDate: () => Date;
  };
};

export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data: Report[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Report[];
        setReports(data);
      } catch (error) {
        console.error('Gagal mengambil data report:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('/kopi.jpg')",
      }}
    >
      <div className="pt-32 px-6 md:px-20 pb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          📋 Laporan Review & Saran
        </h1>

        {/* Tombol Kembali */}
        <div className="flex justify-center gap-4 mb-6 print:hidden">
          <button
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            ⬅ Kembali
          </button>
        </div>

        {reports.length === 0 ? (
          <p className="text-center text-gray-300">Belum ada laporan.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((item) => (
              <div
                key={item.id}
                className="bg-white bg-opacity-90 text-black rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300"
              >
                <p className="text-sm text-gray-600 mb-2">
                  {item.createdAt?.toDate().toLocaleString('id-ID', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Nama:</span> {item.nama }
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Rating:</span>{' '}
                  {item.rating ? '⭐'.repeat(Number(item.rating)) : '-'}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Review:</span> {item.review}
                </p>
                <p>
                  <span className="font-semibold">Saran:</span> {item.suggestion}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
