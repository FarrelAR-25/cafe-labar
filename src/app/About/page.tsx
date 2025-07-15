'use client';

import Header from '../components/Header';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center font-inter text-white relative"
      style={{
        backgroundImage: "linear-gradient(rgba(255, 153, 0, 0.4), rgba(0, 0, 0, 0.8)), url('/kopi.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 text-black backdrop-blur-md py-28 px-6 md:px-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#5a3b1d] mb-6"
          >
            ☕ Tentang Kami
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl leading-relaxed mb-6 text-gray-800"
          >
            <strong>CAFE LABAR</strong> adalah tempat nongkrong terbaik untuk menikmati
            secangkir kopi hangat, makanan ringan, dan suasana yang nyaman. Kami berdedikasi
            untuk menyajikan minuman dan makanan terbaik dari bahan berkualitas, serta
            pelayanan ramah khas anak tongkrongan.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-md md:text-lg text-gray-700"
          >
            Sejak berdiri, kami terus berinovasi dalam rasa, suasana, dan pengalaman.
            Kami percaya bahwa kopi bukan hanya sekadar minuman, tapi juga seni dan cerita
            dalam setiap tegukan.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="mt-10 flex justify-center"
          >
            <Image
              src="/labar.png"
              alt="Cafe Labar Logo"
              width={180}
              height={180}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </motion.div>

          <p className="mt-6 text-sm text-gray-500 italic">
            "Just Enjoy and Taste Our Coffee"
          </p>
        </div>
      </motion.div>

      {/* Maps Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-[#f9f4ef] text-black py-12 px-6 md:px-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#7b4b2a] mb-6">
            Lokasi Kami
          </h2>
          <div className="rounded-xl overflow-hidden shadow-md w-full h-[400px] mb-6">
            <iframe
              src="https://www.google.com/maps?q=-6.328335371380083,106.79929808387001&z=15&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              style={{ border: 0 }}
              title="Lokasi Cafe Labar"
            />
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=-6.328335371380083,106.79929808387001"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Lihat di Google Maps
          </a>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-[#997950] text-white text-center py-3 px-6 text-sm">
        Present By JustAR
      </footer>
    </div>
  );
}
