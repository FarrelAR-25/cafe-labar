'use client';

import { useState, useEffect } from 'react';
import { db } from '@/../firebase';
import { useRouter } from 'next/navigation';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export default function MenuPage() {
  const [menus, setMenus] = useState<any[]>([]);
  const router = useRouter();
  const [filteredMenus, setFilteredMenus] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('Makanan');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState(''); // gambar base64

  const [filterType, setFilterType] = useState('Semua');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [menus, filterType, sortOrder]);

  const fetchMenus = async () => {
    const menuCol = collection(db, 'menus');
    const menuSnapshot = await getDocs(menuCol);
    const menuList = menuSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMenus(menuList);
  };

  const applyFilters = () => {
    let filtered = [...menus];

    if (filterType !== 'Semua') {
      filtered = filtered.filter((menu) => menu.type === filterType);
    }

    filtered.sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

    setFilteredMenus(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const menuData = {
      name,
      type,
      price: parseFloat(price),
      image: imageBase64 || null,
    };

    if (editingId) {
      const docRef = doc(db, 'menus', editingId);
      await updateDoc(docRef, menuData);
      setEditingId(null);
    } else {
      await addDoc(collection(db, 'menus'), menuData);
    }

    // Reset form
    setName('');
    setType('Makanan');
    setPrice('');
    setImageBase64('');
    fetchMenus();
  };

  const handleEdit = (menu: any) => {
    setName(menu.name);
    setType(menu.type || 'Makanan');
    setPrice(menu.price.toString());
    setImageBase64(menu.image || '');
    setEditingId(menu.id);
  };

  const handleDelete = async (id: string) => {
    const docRef = doc(db, 'menus', id);
    await deleteDoc(docRef);
    fetchMenus();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center py-16 px-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(105, 79, 60, 0.85),rgba(0, 0, 0, 0.85), rgba(88, 56, 17, 0.85)), url('/kopi.jpg')",
      }}
    >
      <h1 className="text-3xl text-white font-bold mb-8">Kelola Menu</h1>
      <button
        onClick={() => router.back()}
        className="mb-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded px-6 py-2 transition"
      >
        ⬅ Kembali
      </button>

      {/* Form tambah/edit menu */}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded-lg shadow-md p-8 w-full max-w-xl mb-10"
      >
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="name">
            Nama Menu
          </label>
          <input
            id="name"
            type="text"
            placeholder="Masukkan nama menu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="type">
            Jenis Menu
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="price">
            Harga (Rp)
          </label>
          <input
            id="price"
            type="number"
            placeholder="Masukkan harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
  <label className="block font-semibold mb-1" htmlFor="image">
    Gambar Menu
  </label>

  <label
    htmlFor="imageUpload"
    className="inline-block bg-gray-600 hover:bg-yellow-700 text-white text-sm font-medium py-2 px-4 rounded cursor-pointer transition"
  >
    📷 Choose Photo
  </label>

  <input
    id="imageUpload"
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageBase64(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }}
    className="hidden"
  />

  {imageBase64 && (
    <img
      src={imageBase64}
      alt="Preview"
      className="mt-4 w-full h-40 object-cover rounded"
    />
  )}
</div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-6 py-3 w-full transition"
        >
          {editingId ? 'Update Menu' : 'Tambah Menu'}
        </button>
      </form>

      {/* Filter dan Sort */}
      <div className="flex flex-wrap gap-4 justify-center mb-6 text-white">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-white text-black rounded px-4 py-2"
        >
          <option value="Semua">Semua Jenis</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-white text-black rounded px-4 py-2"
        >
          <option value="asc">Harga Termurah</option>
          <option value="desc">Harga Termahal</option>
        </select>
      </div>

      {/* Daftar menu */}
      <div className="w-full max-w-6xl flex flex-wrap gap-4 overflow-x-auto px-2">
        {filteredMenus.map((menu) => (
          <div
            key={menu.id}
            className="bg-white text-black rounded-lg shadow-md p-6 w-80 flex flex-col"
          >
            {menu.image && (
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{menu.name}</h2>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  menu.type === 'Makanan'
                    ? 'bg-yellow-300 text-yellow-900'
                    : 'bg-blue-300 text-blue-900'
                }`}
              >
                {menu.type}
              </span>
            </div>
            <p className="text-gray-700 mb-4">
              Rp {menu.price.toLocaleString()}
            </p>
            <div className="mt-auto flex gap-3">
              <button
                onClick={() => handleEdit(menu)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(menu.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
