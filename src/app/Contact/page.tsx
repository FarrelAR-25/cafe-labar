'use client';

import Header from '../components/Header';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div
      className="min-h-screen font-inter text-white bg-cover bg-center relative"
      style={{
        backgroundImage: "linear-gradient(rgba(255, 153, 0, 0.4), rgba(0, 0, 0, 0.8)), url('/kopi.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      <Header />

      {/* Content with animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/70 backdrop-blur-md text-black py-24 px-6 md:px-20"
      >
        {/* Section: Contact Info */}
        <motion.section
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#5a3b1d] mb-8">
            ☕ Kontak & Lokasi
          </h1>
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Kontak Info */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Hubungi Kami</h2>
              <p className="mb-2">📍 Jl. Kopi No.123, Depok, Indonesia</p>
              <p className="mb-2">📞 +62 812 3456 7890</p>
              <p className="mb-2">📧 labarcoffee@example.com</p>
              <p className="mb-2">⏰ 08.00 – 22.00 WIB</p>
            </div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-2xl font-semibold mb-4">Lokasi Kami</h2>
              <div className="rounded-xl overflow-hidden shadow-md w-full h-[300px]">
                <iframe
                  title="Google Maps Labar Coffee"
                  src="https://www.google.com/maps?q=-6.328335371380083,106.79929808387001&z=15&output=embed"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section: Testimoni */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#5a3b1d] mb-8">
            🌟 Apa Kata Pelanggan Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Azmi, Mahasiswa',
                quote:
                  'Tempatnya cozy banget, cocok buat kerja atau santai bareng teman. Mie gobarnya juga juara!',
              },
              {
                name: 'Farrel, Algojo',
                quote:
                  'Suka banget sama Peach Tea-nya, seger dan pas manisnya. Recommended buat nongkrong sore.',
              },
              {
                name: 'NoName, PKI',
                quote:
                  'Kopi di Labar beda dari yang lain, creamy tapi tetap strong. Pelayanannya juga ramah banget.',
              },
            ].map((t, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-white bg-opacity-90 text-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <p className="text-sm italic mb-4">"{t.quote}"</p>
                <div className="font-semibold">– {t.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>

      {/* Footer */}
      <footer className="bg-[#997950] text-white text-center py-3 px-6 text-sm">
        Present By JustAR
      </footer>
    </div>
  );
}
