'use client';

import Image from 'next/image';
import Header from '../components/Header';

const menuItems = [
  {
    name: 'Peach Tea',
    description: 'Teh manis dengan sensasi Peach.',
    price: '15.000',
    image: '/menu/peach.jpeg',
  },
  {
    name: 'Sekuteng',
    description: 'Minuman hangat dengan kacang dan rempah khas.',
    price: '10.000',
    image: '/menu/sekuteng.jpeg',
  },
  {
    name: 'Coppacino',
    description: 'Kopi susu dengan rasa creamy yang pas.',
    price: '15.000',
    image: '/menu/copacino.jpeg',
  },
  {
    name: 'Nasi Goreng Labar',
    description: 'Nasi goreng telur yang gurih khas Labar.',
    price: '18.000',
    image: '/menu/nasgor.jpeg',
  },
  {
    name: 'Mie Bubar',
    description: 'Mie rebus hangat ala Labar.',
    price: '7.000',
    image: '/menu/rebus.jpeg',
  },
  {
    name: 'Mie Gobar',
    description: 'Mie goreng pedas khas Labar.',
    price: '7.000',
    image: '/menu/goreng.jpeg',
  },
];

export default function MenuPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/kopi.jpg')" }}
    >
      {/* Header */}
      <Header />

      {/* Overlay */}
      <div className="bg-black/60 pt-24 pb-12 px-6 md:px-20">
        <h1 className="text-3xl md:text-4xl font-bold text-[#ffcc99] text-center mb-10">
          Menu Kami
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="bg-white/90 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="relative w-full h-[400px] overflow-hidden rounded-t-xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 text-black">
                <h3 className="text-xl font-semibold text-[#7b4b2a]">{item.name}</h3>
                <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                <div className="mt-4 text-[#ff9900] font-bold">{item.price} IDR</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
