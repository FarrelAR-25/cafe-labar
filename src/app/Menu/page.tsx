'use client';

import Image from 'next/image';
import Header from '../components/Header';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  {
    name: 'Peach Tea',
    description: 'Teh manis dengan sensasi Peach.',
    price: '15.000',
    image: '/menu/peach.jpeg',
    type: 'Minuman',
  },
  {
    name: 'Sekuteng',
    description: 'Minuman hangat dengan kacang dan rempah khas.',
    price: '10.000',
    image: '/menu/sekuteng.jpeg',
    type: 'Minuman',
  },
  {
    name: 'Coppacino',
    description: 'Kopi susu dengan rasa creamy yang pas.',
    price: '15.000',
    image: '/menu/copacino.jpeg',
    type: 'Minuman',
  },
  {
    name: 'Nasi Goreng Labar',
    description: 'Nasi goreng telur yang gurih khas Labar.',
    price: '18.000',
    image: '/menu/nasgor.jpeg',
    type: 'Makanan',
  },
  {
    name: 'Mie Bubar',
    description: 'Mie rebus hangat ala Labar.',
    price: '7.000',
    image: '/menu/rebus.jpeg',
    type: 'Makanan',
  },
  {
    name: 'Mie Gobar',
    description: 'Mie goreng pedas khas Labar.',
    price: '7.000',
    image: '/menu/goreng.jpeg',
    type: 'Makanan',
  },
];

export default function MenuPage() {
  const [filter, setFilter] = useState<'All' | 'Makanan' | 'Minuman'>('All');
  type MenuItem = {
    name: string;
    description: string;
    price: string;
    image: string;
    type: string;
  };
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems =
    filter === 'All' ? menuItems : menuItems.filter(item => item.type === filter);

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 130, 34, 0.6), rgba(4,16,37,0.8)), url('/kopi.jpg')",
      }}
    >
      <Header />

      {/* Konten Utama */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-grow bg-black/50 backdrop-blur-md pt-24 pb-12 px-4 sm:px-8 md:px-16"
      >
        <h1 className="text-center text-white text-[clamp(1.8rem,5vw,3rem)] font-extrabold mb-6 drop-shadow-md">
          ☕ Menu Kami
        </h1>

        <div className="flex justify-center mb-8 gap-4">
          {['All', 'Makanan', 'Minuman'].map((item, i) => (
            <motion.button
              key={item}
              onClick={() => setFilter(item as 'All' | 'Makanan' | 'Minuman')}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition duration-300 ${
                filter === item
                  ? 'bg-yellow-400 text-yellow-900 shadow'
                  : 'bg-white/30 text-white hover:bg-white/50'
              }`}
            >
              {item}
            </motion.button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          <AnimatePresence>
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer bg-white/90 text-black rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-[#7b4b2a]">{item.name}</h3>
                  <p className="text-sm text-gray-700 mt-1 flex-grow">{item.description}</p>
                  <div className="mt-4 text-right text-[#ff9900] font-bold">{item.price} IDR</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Preview */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white text-black rounded-xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto relative"
              >
                {/* Close Button */}
                <button
                  className="absolute top-2 right-2 text-lg text-gray-500 hover:text-black z-10"
                  onClick={() => setSelectedItem(null)}
                >
                  ✕
                </button>

                {/* Image Preview */}
                <div className="relative w-full aspect-[4/3] rounded-t-xl overflow-hidden">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text Info */}
                <div className="p-5 pb-6">
                  <h2 className="text-xl font-bold mb-2">{selectedItem.name}</h2>
                  <p className="text-sm text-gray-700 mb-3">{selectedItem.description}</p>
                  <div className="text-[#ff9900] font-bold">{selectedItem.price} IDR</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* Footer */}
      <footer className="bg-[#997950] py-4 px-6 text-center text-white text-sm">
        <p className="font-semibold">Present By JustAR</p>
      </footer>
    </div>
  );
}
