/**
 * Register proyek — saat ini 2 slot kosong (placeholder) menunggu konten.
 * Isi field di bawah saat siap; kartu otomatis pindah dari state "menyusul".
 */
export type Project = {
  id: string;
  title: string | null;
  category: string | null;
  year: string | null;
  description: string | null;
  results: string[];
  link?: string;
  image?: string;
};

export const projectDetails: Project[] = [
  {
    id: 'gastros',
    title: 'GASTROS — Toko Game Online',
    category: 'E-Commerce',
    year: '2026',
    description:
      'Toko game online (gastros.id): beli koin, item, dan paket langganan dari berbagai publisher. Checkout QRIS & transfer bank, plus notifikasi transaksi langsung ke WhatsApp.',
    results: [
      'Katalog game lintas publisher dengan pemilihan nominal & quantity.',
      'Checkout QRIS dan transfer bank dengan halaman cek status order.',
      'Notifikasi transaksi otomatis via WhatsApp (Fonnte API).',
      'Panel admin + API order di atas Next.js App Router, MongoDB, dan Vercel.',
    ],
    link: 'https://github.com/audyalvasyha/store',
    image: '/images/gastros-thumb.png',
  },
  {
    id: 'midaa-tms',
    title: 'Midaa — Transport Management System',
    category: 'Dasbor Operasional',
    year: '2026',
    description:
      'Dasbor untuk mengelola armada: inventaris unit, riwayat perbaikan, analisa ban, pengingat servis, sisa kiriman (SKR), dan pengiriman outbound — satu layar supaya tim lapangan dan administrasi membaca angka yang sama.',
    results: [
      'Dashboard 6 kartu statistik: kapasitas, biaya 30 hari + delta, servis terlewat.',
      'Monitoring servis berbasis KPI (terlewat → segera → aman) dengan prioritas otomatis.',
      'Gerbang login Supabase Auth + kebijakan RLS yang mengunci data PII pelanggan per-kolom.',
      'Chatbot “Tanya Data” untuk bertanya ke data operasional tanpa query manual.',
    ],
    link: 'https://github.com/audyalvasyha/v2app',
  },
];
