'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/../firebase';
import {
  collection,
  getDocs,
  addDoc,
} from 'firebase/firestore';

export default function OrderPage() {
  const [menus, setMenus] = useState<any[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [selectedMenuIds, setSelectedMenuIds] = useState<string[]>([]);
  const [orderNumber, setOrderNumber] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchMenus();
    generateOrderNumber();
  }, []);

  const fetchMenus = async () => {
    const menuSnapshot = await getDocs(collection(db, 'menus'));
    const menuList = menuSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMenus(menuList);
  };

  const generateOrderNumber = async () => {
    const ordersSnapshot = await getDocs(collection(db, 'orders'));
    const orderCount = ordersSnapshot.size;
    const newOrderNumber = `ORD${(orderCount + 1).toString().padStart(3, '0')}`;
    setOrderNumber(newOrderNumber);
  };

  const handleMenuChange = (id: string) => {
    setSelectedMenuIds((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  const totalPrice = selectedMenuIds.reduce((acc, id) => {
    const menu = menus.find((m) => m.id === id);
    return acc + (menu?.price || 0);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || selectedMenuIds.length === 0) return;

    const selectedMenus = menus
      .filter((menu) => selectedMenuIds.includes(menu.id))
      .map((menu) => ({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        image: menu.image || null,
      }));

    await addDoc(collection(db, 'orders'), {
      orderNumber,
      customerName,
      menus: selectedMenus,
      total: totalPrice,
      timestamp: new Date(),
    });

    // Reset form dan tampilkan popup
    setCustomerName('');
    setSelectedMenuIds([]);
    setShowPopup(true);
    generateOrderNumber(); // untuk pesanan berikutnya
  };

  const handlePesanLagi = () => {
    setShowPopup(false); // hanya tutup popup, tetap di halaman
  };

  const handleSelesai = () => {
    router.push('/'); // redirect ke halaman home
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-6 flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(103, 94, 35, 0.8), rgba(0, 0, 0, 0.8)), url('/kopi.jpg')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded shadow-md max-w-xl w-full text-black"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Buat Pesanan</h1>

        <div className="mb-4">
          <label className="font-semibold block mb-1">Nomor Pesanan</label>
          <input
            type="text"
            value={orderNumber}
            disabled
            className="border rounded w-full px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold block mb-1">Nama Pemesan</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border rounded w-full px-3 py-2"
            placeholder="Contoh: Budi"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold block mb-2">Pilih Menu</label>
          {menus.map((menu) => (
            <div key={menu.id} className="flex items-center mb-4">
              <input
                type="checkbox"
                id={`menu-${menu.id}`}
                checked={selectedMenuIds.includes(menu.id)}
                onChange={() => handleMenuChange(menu.id)}
                className="mr-2"
              />
              <label htmlFor={`menu-${menu.id}`} className="flex items-center gap-3">
                {menu.image && (
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <span>
                  {menu.name} - Rp {menu.price.toLocaleString()}
                </span>
              </label>
            </div>
          ))}
        </div>

        <div className="mb-4 font-semibold">
          Total Harga: Rp {totalPrice.toLocaleString()}
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded w-full"
        >
          Simpan Pesanan
        </button>
      </form>

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
      <p className="text-black mb-6">
        Pesanan sudah berhasil dibuat. Silahkan ditunggu dan jangan lupa bayar yaa 😊
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handlePesanLagi}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Pesan Lagi
        </button>
        <button
          onClick={handleSelesai}
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
