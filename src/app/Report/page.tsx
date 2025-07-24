'use client';

import { useEffect, useState } from 'react';
import { db } from '@/../firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

type ReportType = {
  id: string;
  nama: string;
  review: string;
  suggestion: string;
  rating: number;
  createdAt: {
    toDate: () => Date;
  };
};

export default function Report() {
  const [nama, setNama] = useState('');
  const [review, setReview] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [rating, setRating] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [reports, setReports] = useState<ReportType[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'reports'), {
        nama,
        review,
        suggestion,
        rating: Number(rating),
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setNama('');
      setReview('');
      setSuggestion('');
      setRating('');
      fetchReports(); // refresh data
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const fetchReports = async () => {
    try {
      const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data: ReportType[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ReportType[];
      setReports(data);
    } catch (error) {
      console.error('Gagal mengambil data report:', error);
    }
  };

  useEffect(() => {
    fetchReports();

    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-inter">
      <Header />

      <main className="flex-grow">
        <section
          className="relative flex flex-col items-center justify-center text-center min-h-screen px-4 sm:px-6 lg:px-8 py-16 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,130,34,0.6), rgba(4,16,37,0.8)), url('/kopi.jpg')",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-3xl font-bold mb-4"
          >
            Laporan & Saran
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white text-sm max-w-xl mb-8"
          >
            Bantu kami untuk meningkatkan layanan dengan memberikan ulasan dan saran!
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-90 rounded-lg p-6 w-full max-w-md text-left shadow-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Nama:</span>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Rating (1–5):</span>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
              >
                <option value="">Pilih rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Review Makanan/Minuman:</span>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
                rows={3}
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">Saran untuk Kami:</span>
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring"
                rows={3}
              />
            </label>

            <button
              type="submit"
              className="w-full bg-[#997950] hover:bg-[#b18556] text-white font-bold py-2 px-4 rounded-md"
            >
              Kirim
            </button>

            {submitted && (
              <p className="text-green-600 mt-4 font-semibold text-sm">
                Terima kasih atas masukannya!
              </p>
            )}
          </motion.form>

          {/* Daftar Report */}
          <div className="w-full max-w-4xl">
            <h2 className="text-xl font-bold text-white mb-4 text-center">📋 Ulasan Masuk</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white bg-opacity-90 text-black rounded-lg p-4 shadow-md"
                >
                  <p className="text-sm text-gray-600 mb-1">
                    {report.createdAt?.toDate().toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                  <p className="font-semibold">Nama: {report.nama || 'Anonim'}</p>
                  <p>Rating: {'⭐'.repeat(report.rating)}</p>
                  <p className="mt-1">
                    <span className="font-semibold">Review:</span> {report.review}
                  </p>
                  <p>
                    <span className="font-semibold">Saran:</span> {report.suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#997950] py-3 px-6 text-white text-center text-sm">
        Present By JustAR
      </footer>

      {showScroll && (
        <button
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}
