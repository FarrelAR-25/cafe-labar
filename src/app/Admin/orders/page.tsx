'use client';

import { useEffect, useState } from 'react';
import { db } from '@/../firebase';
import { useRouter } from 'next/navigation';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from 'firebase/firestore';

interface MenuItem {
  qty: number;
  id?: string;
  name: string;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string | number;
  customerName: string;
  menus: MenuItem[];
  total: number;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editedCustomerName, setEditedCustomerName] = useState('');
  const [editedMenuIds, setEditedMenuIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchMenus();
    fetchOrders();
  }, []);

  // Ambil semua menu untuk opsi edit
  const fetchMenus = async () => {
    const menuSnap = await getDocs(collection(db, 'menus'));
    const menusData = menuSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MenuItem[];
    setMenus(menusData);
  };

  // Ambil orders
  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, 'orders'));
    const ordersData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
    setOrders(ordersData);
  };

  // Mulai edit
  const startEdit = (order: Order) => {
    setEditingOrderId(order.id);
    setEditedCustomerName(order.customerName);
    setEditedMenuIds(order.menus.map((m) => (m.id ? m.id : '')));
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingOrderId(null);
    setEditedCustomerName('');
    setEditedMenuIds([]);
  };

  // Toggle menu checkbox di edit
  const toggleMenuEdit = (id: string) => {
    setEditedMenuIds((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  // Simpan hasil edit
  const saveEdit = async () => {
    if (!editingOrderId) return;

    const selectedMenus = menus.filter((menu) => editedMenuIds.includes(menu.id!));
    const newTotal = selectedMenus.reduce((acc, m) => acc + m.price, 0);

    const orderRef = doc(db, 'orders', editingOrderId);
    await updateDoc(orderRef, {
      customerName: editedCustomerName,
      menus: selectedMenus,
      total: newTotal,
    });

    cancelEdit();
    fetchOrders();
  };

  // Clear order = pindah ke history lalu hapus dari orders
  const clearOrder = async (order: Order) => {
    await addDoc(collection(db, 'history'), {
      ...order,
      clearedAt: new Date(),
    });

    await deleteDoc(doc(db, 'orders', order.id));
    fetchOrders();
  };

  // Hapus order = batalkan pesanan (tanpa simpan ke history)
  const deleteOrder = async (id: string) => {
    const confirmDelete = confirm('Apakah Anda yakin ingin membatalkan pesanan ini?');
    if (!confirmDelete) return;

    await deleteDoc(doc(db, 'orders', id));
    fetchOrders();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(105, 79, 60, 0.85),rgba(0, 0, 0, 0.85), rgba(88, 56, 17, 0.85)), url('/kopi.jpg')",
      }}
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Daftar Pesanan</h1>

      {orders.length === 0 && (
        <p className="text-center text-black">Belum ada pesanan.</p>
      )}

      <div className="flex justify-center gap-4 mb-6 print:hidden">
        <button
          onClick={() => router.back()}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          ⬅ Kembali
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => {
          const isEditing = editingOrderId === order.id;

          return (
            <div key={order.id} className="bg-white rounded shadow-md p-6 text-black">
              <h2 className="text-xl font-semibold mb-2">No. Pesanan: {order.orderNumber}</h2>

              {isEditing ? (
                <>
                  <label className="font-medium block mb-1">Nama Pemesan:</label>
                  <input
                    type="text"
                    value={editedCustomerName}
                    onChange={(e) => setEditedCustomerName(e.target.value)}
                    className="border rounded px-2 py-1 mb-4 w-full"
                  />

                  <label className="font-medium block mb-1">Pilih Menu:</label>
                  <div className="mb-4 max-h-40 overflow-auto border rounded p-2">
                    {menus.map((menu) => (
                      <div key={menu.id} className="flex items-center mb-1">
                        <input
                          type="checkbox"
                          id={`edit-menu-${menu.id}`}
                          checked={editedMenuIds.includes(menu.id!)}
                          onChange={() => toggleMenuEdit(menu.id!)}
                          className="mr-2"
                        />
                        <label htmlFor={`edit-menu-${menu.id}`}>
                          {menu.name} - Rp {menu.price.toLocaleString()}
                        </label>
                      </div>
                    ))}
                  </div>

                  <p className="font-semibold mb-4">
                    Total Harga: Rp{' '}
                    {menus
                      .filter((m) => editedMenuIds.includes(m.id!))
                      .reduce((acc, m) => acc + m.price, 0)
                      .toLocaleString()}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={saveEdit}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Batal
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-1 font-medium">Pemesan: {order.customerName}</p>
                  <p className="mb-1 font-medium">Menu yang dipesan:</p>
                  <ul className="list-disc list-inside mb-2 max-h-36 overflow-auto">
  {(order.menus ?? []).map((menu, i) => (
    <li key={i}>
      {menu.name} (x{menu.qty ?? 1}) - Rp {(menu.price * (menu.qty ?? 1)).toLocaleString()}
    </li>
  ))}
</ul>

                  <p className="font-semibold mb-4">
                    Total Harga: Rp {order.total.toLocaleString()}
                  </p>

                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => startEdit(order)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => clearOrder(order)}
                      className="bg-green-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Pesanan Selesai
                    </button>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
