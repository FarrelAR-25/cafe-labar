'use client';

import Header from '../components/Header';

export default function ContactPage() {
  return (
    <div className="relative font-inter min-h-screen text-white">
      {/* Background kopi.jpg dengan overlay gelap */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/kopi.jpg')" }}
      >
        <div className="absolute inset-0 bg-opacity-60 backdrop-blur-sm" />
      </div>

      {/* Konten utama */}
      <div className="relative z-10">
        <Header />

        {/* Contact Section */}
        <section className="pt-28 pb-16 px-6 md:px-20">
          <h1 className="text-black text-3xl md:text-4xl font-bold text-center mb-8">
            Kontak & Lokasi
          </h1>

          <div className="flex flex-col md:flex-row gap-8 justify-between">
            {/* Informasi Kontak */}
            <div className="md:w-1/2">
              <h2 className="text-black text-2xl font-semibold mb-4">Hubungi Kami</h2>
              <p className="text-black mb-2">📍 Alamat: Jl. Kopi No.123, Depok, Indonesia</p>
              <p className="text-black mb-2">📞 Telepon: +62 812 3456 7890</p>
              <p className="text-black mb-2">📧 Email: labarcoffee@example.com</p>
              <p className="text-black mb-2">⏰ Jam Operasional: 08.00 – 22.00 WIB</p>
            </div>

            {/* Google Maps */}
            <div className="md:w-1/2">
              <h2 className="text-black text-2xl font-semibold mb-4">Lokasi Kami</h2>
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
            </div>
          </div>
        </section>

        {/* Ulasan Pelanggan */}
        <section className="py-12 px-6 md:px-20">
          <h2 className="text-black text-2xl md:text-3xl font-bold text-center mb-8">
            Apa Kata Pelanggan Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimoni 1 */}
            <div className="bg-white bg-opacity-90 text-gray-900 p-6 rounded-xl shadow-md">
              <p className="text-sm italic mb-4">
                "Tempatnya cozy banget, cocok buat kerja atau santai bareng teman. Mie gobarnya juga juara!"
              </p>
              <div className="font-semibold">– Azmi, Mahasiswa</div>
            </div>

            {/* Testimoni 2 */}
            <div className="bg-white bg-opacity-90 text-gray-900 p-6 rounded-xl shadow-md">
              <p className="text-sm italic mb-4">
                "Suka banget sama Peach Tea-nya, seger dan pas manisnya. Recommended buat nongkrong sore."
              </p>
              <div className="font-semibold">– Farrel, Algojo</div>
            </div>

            {/* Testimoni 3 */}
            <div className="bg-white bg-opacity-90 text-gray-900 p-6 rounded-xl shadow-md">
              <p className="text-sm italic mb-4">
                "Kopi di Labar beda dari yang lain, creamy tapi tetap strong. Pelayanannya juga ramah banget."
              </p>
              <div className="font-semibold">– NoName, PKI</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
