'use client';

import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Link from 'next/link';
import Header from '../components/Header';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem('isVisited');
    if (!visited) {
      setShowPopup(true);
      localStorage.setItem('isVisited', 'true');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-inter">
      <Header />

      {/* Hero Section */}
      <main className="flex-grow">
        <section
          className="relative flex flex-col items-center justify-center text-center min-h-screen px-4 sm:px-6 lg:px-8 py-16 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,130,34,0.6), rgba(4,16,37,0.8)), url('/kopi.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center mb-6"
          >
            <img src="/labar.png" alt="logo" className="h-32 w-auto sm:h-40" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-[clamp(1.5rem,4vw,3rem)] font-extrabold leading-tight tracking-wide"
          >
            WELCOME TO<br />
            <span className="text-yellow-300">L A B A R</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white mt-4 text-sm sm:text-base max-w-xl"
          >
            Please Enjoy & Taste Our Coffee
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center mt-6 space-x-4 text-xs sm:text-sm text-white/80 font-semibold"
          >
            <li>Available for :</li>
            <li className="border-l border-white/50 pl-4">Everyone</li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 flex justify-center"
          >
            <Link href="/Order">
              <button className="bg-black hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-md transition">
                Order Now
              </button>
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#997950] py-3 px-6 text-white text-center text-sm">
        Present By JustAR
      </footer>

      {/* Scroll to top button */}
      {showScroll && (
        <button
          aria-label="Scroll to top"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
        >
          <FaArrowUp />
        </button>
      )}

      {/* Welcome Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-black rounded-lg shadow-lg p-6 max-w-sm w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-2">Selamat Datang!</h2>
              <p className="text-sm text-gray-700">
                Nikmati pengalaman memesan makanan dan minuman favoritmu di <b>CAFE LABAR</b>. Just enjoy and taste our coffee!
              </p>
              <button
                onClick={handleClosePopup}
                className="mt-4 bg-[#997950] text-white px-6 py-2 rounded-md hover:bg-[#b18556] transition"
              >
                Mulai
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
