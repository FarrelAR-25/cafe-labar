'use client';

import Header from '../components/Header';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/kopi.jpg')" }}
    >
      <Header />

      {/* Overlay Section */}
      <div className="bg-black/60 pt-28 pb-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#ffcc99] mb-6">
            Tentang Kami
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
            <strong>CAFE LABAR</strong> adalah tempat nongkrong terbaik untuk menikmati
            secangkir kopi hangat, makanan ringan, dan suasana yang nyaman. Kami berdedikasi
            untuk menyajikan minuman dan makanan terbaik dari bahan berkualitas, serta
            pelayanan ramah khas anak tongkrongan.
          </p>

          <p className="text-md md:text-lg text-gray-300">
            Sejak berdiri, kami terus berinovasi dalam rasa, suasana, dan pengalaman.
            Kami percaya bahwa kopi bukan hanya sekadar minuman, tapi juga seni dan cerita
            dalam setiap tegukan.
          </p>

          <div className="mt-10 flex justify-center">
            <Image
              src="/labar.png"
              alt="Cafe Labar Logo"
              width={180}
              height={180}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>

          <p className="mt-6 text-sm text-gray-400 italic">
            "Just Enjoy and Taste Our Coffee"
          </p>
        </div>
      </div>

      {/* Maps Section */}
      <div className="bg-[#f5f5f5] py-12 px-6 md:px-20 text-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#7b4b2a] mb-6">
            Lokasi Kami
          </h2>

          {/* Embedded Map */}
          <div className="w-full h-[400px] mb-6">
            <iframe
              src="https://www.google.com/maps?q=-6.328335371380083,106.79929808387001&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Cafe Labar"
            ></iframe>
          </div>

          {/* Link ke Google Maps */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=-6.328335371380083,106.79929808387001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-blue-600 hover:underline"
          >
            Lihat di Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
