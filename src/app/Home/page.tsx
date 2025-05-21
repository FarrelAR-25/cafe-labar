'use client';

import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Link from 'next/link';
import Header from '../components/Header';

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FFFFF] text-white font-inter">
      {/* Header hanya muncul di halaman ini */}
      <Header />

      {/* Hero Section */}
      <section
        className="relative pt-30 pb-20 flex flex-col items-center text-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(255, 130, 34) 0%, rgba(4,16,37,0.9) 40%, rgba(28, 11, 215, 0.3) 100%), url('/kopi.jpg')",
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="flex justify-center mb-6">
          <img src="/labar.png" alt="logo" className="h-50 w-auto" />
        </div>
        <h1 className="text-black text-4xl sm:text-5xl font-extrabold text-[#d3c7e9] leading-tight max-w-4xl">
          Welcome & Enjoy<br />
          <span className="text-black">L A B A R</span>
        </h1>
        <p className="text-black mt-4 max-w-xl text-sm sm:text-base text-[#d3c7e9]">
          jadi inituh site pemesanan ya temen temen labar. just enjoy and taste our coffee
        </p>
        <ul className="flex flex-wrap justify-center items-center mt-6 space-x-4 text-xs sm:text-sm text-black/90 font-semibold max-w-xl">
          <li>Available for :</li>
          <li className="border-l border-white/50 pl-4">Everyone</li>
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/Order">
            <button className="bg-black hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition">
              Order Now
            </button>
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-[#997950] py-12 px-6 md:px-20 flex flex-col md:flex-row justify-between text-sm md:text-base max-w-10xl mx-auto">
        <h3 className="font-semibold text-white text-base md:text-lg mb-2">Present By JustAR</h3>
      </section>

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
    </div>
  );
}
