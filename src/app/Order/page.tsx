'use client';

import { useEffect, useState } from 'react';
import { db } from '@/../firebase';
import { useRouter } from 'next/navigation';
import {
  collection,
  addDoc,
  getDocs,
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  type: 'Makanan' | 'Minuman';
}

export default function OrderPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [step, setStep] = useState<'tipe' | 'menu'>('tipe');
  const [orderType, setOrderType] = useState<'dinein' | 'takeaway' | null>(null);
  const [tab, setTab] = useState<'Makanan' | 'Minuman'>('Makanan');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [customerName, setCustomerName] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchMenus();
    generateOrderNumber();
  }, []);

  const fetchMenus = async () => {
    const snapshot = await getDocs(collection(db, 'menus'));
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as MenuItem[];
    setMenus(data);
  };

  const generateOrderNumber = async () => {
    const snapshot = await getDocs(collection(db, 'orders'));
    setOrderNumber(`ORD${(snapshot.size + 1).toString().padStart(3, '0')}`);
  };

  const handleQuantityChange = (id: string, amount: number) => {
    setCart(prev => {
      const updated = { ...prev };
      updated[id] = (updated[id] || 0) + amount;
      if (updated[id] <= 0) delete updated[id];
      return updated;
    });
  };

  const selectedMenus = menus.filter(m => cart[m.id]);
  const total = selectedMenus.reduce((sum, item) => sum + item.price * cart[item.id], 0);

  const handleSubmit = async () => {
    if (!customerName || selectedMenus.length === 0) return;

    const orderItems = selectedMenus.map(item => ({ ...item, qty: cart[item.id] }));

    await addDoc(collection(db, 'orders'), {
      orderNumber,
      orderType,
      customerName,
      menus: orderItems,
      total,
      timestamp: new Date(),
    });

    setCustomerName('');
    setCart({});
    setShowPopup(true);
    generateOrderNumber();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-10 relative"
      style={{
        backgroundImage: "linear-gradient(rgba(103,94,35,0.8), rgba(0,0,0,0.8)), url('/kopi.jpg')",
      }}
    >
      {/* Cart Button Outside */}
      <button
        type="button"
        onClick={() => setShowCart(!showCart)}
        className="fixed top-4 right-4 bg-yellow-500 hover:bg-yellow-600 p-3 rounded-full shadow-xl z-50"
        aria-label="Lihat Keranjang"
      >
        <ShoppingCart className="text-white w-5 h-5" />
      </button>

      {step === 'tipe' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-white/80 to-yellow-100/80 backdrop-blur-md p-6 rounded-xl shadow-xl w-full max-w-2xl mx-auto text-center text-black"
        >
          <h1 className="text-2xl font-bold mb-6">Pilih Tipe Pesanan</h1>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setOrderType('dinein');
                setStep('menu');
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-bold py-4 rounded shadow transition"
            >
              🍽️ Dine In
            </button>
            <button
              onClick={() => {
                setOrderType('takeaway');
                setStep('menu');
              }}
              className="bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 rounded shadow transition"
            >
              🥡 Take Away
            </button>
            <button
              onClick={() => router.push('/')}
              className="text-sm text-gray-500 hover:underline mt-4"
            >
              ⬅ Kembali
            </button>
          </div>
        </motion.div>
      )}

      {step === 'menu' && (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-white/80 to-yellow-100/80 backdrop-blur-md p-6 rounded-xl shadow-xl w-full max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-black relative"
        >
          <br></br>
          <button
            type="button"
            onClick={() => setStep('tipe')}
            className="absolute left-4 top-4 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm text-gray-700 font-semibold rounded-md shadow"
          >
            ⬅ Kembali
          </button>
          <h1 className="col-span-full text-2xl md:text-3xl font-extrabold text-center tracking-wide text-black drop-shadow mb-4">
            🛒 ORDER LABAR
          </h1>

          <div className="col-span-full flex justify-center gap-4 flex-wrap mb-6">
            <button
              type="button"
              onClick={() => setTab('Makanan')}
              className={`px-4 py-2 rounded-full font-semibold transition text-sm md:text-base ${
                tab === 'Makanan' ? 'bg-yellow-300 text-yellow-900 shadow' : 'bg-gray-200 text-gray-600'
              }`}
            >
              🍽️ Makanan
            </button>
            <button
              type="button"
              onClick={() => setTab('Minuman')}
              className={`px-4 py-2 rounded-full font-semibold transition text-sm md:text-base ${
                tab === 'Minuman' ? 'bg-blue-300 text-blue-900 shadow' : 'bg-gray-200 text-gray-600'
              }`}
            >
              🥤 Minuman
            </button>
          </div>

          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {menus.filter(m => m.type === tab).map(menu => (
                  <div key={menu.id} className="flex items-center justify-between mb-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      {menu.image && (
                        <img
                          src={menu.image}
                          alt={menu.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <span>{menu.name} - Rp {menu.price.toLocaleString()}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleQuantityChange(menu.id, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                      <span>{cart[menu.id] || 0}</span>
                      <button onClick={() => handleQuantityChange(menu.id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Panel Keranjang */}
          <AnimatePresence>
            {showCart && (
              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 300, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="fixed bottom-0 right-0 w-full max-w-md bg-white text-black p-6 rounded-t-xl shadow-2xl z-50"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    🛒 Keranjang
                  </h4>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Tutup
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">Nama Pemesan</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div className="text-sm mb-2">
                  <span className="font-semibold">No. Pesanan:</span> {orderNumber}
                </div>
                <div className="text-sm mb-2 capitalize">
                  <span className="font-semibold">Tipe:</span> {orderType}
                </div>

                <ul className="list-disc pl-4 mb-2 text-sm">
                  {selectedMenus.map((menu) => (
                    <li key={menu.id}>{menu.name} x {cart[menu.id]} - Rp {(menu.price * cart[menu.id]).toLocaleString()}</li>
                  ))}
                </ul>

                <div className="font-semibold text-sm mb-4">
                  Total: Rp {total.toLocaleString()}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-semibold"
                >
                  Simpan Pesanan
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center w-96 relative overflow-hidden"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('/kopi.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <h2 className="text-black text-xl font-bold mb-4">Pesanan Berhasil!</h2>
            <p className="text-black mb-6">Pesanan berhasil dibuat. Silahkan ditunggu dan jangan lupa bayar yaa 😊</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Pesan Lagi
              </button>
              <button
                onClick={() => router.push('/')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Sudah, Cukup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
