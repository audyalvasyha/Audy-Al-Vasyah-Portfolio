/**
 * Riwayat kerja. Angka **bold** di sini diparse ExperienceCard
 * jadi penekanan warna merah (lihat highlightMetric).
 */
export type Job = {
  role: string;
  company: string;
  period: string;
  achievements: string[];
};

export const experienceData: Job[] = [
  {
    role: 'Transport Planner',
    company: 'PT. Pekanbaru Distribusindo Raya (Wings Group)',
    period: '2024 — Sekarang',
    achievements: [
      'Mengelola 100+ rute pengiriman harian, lalu membangun sistem penjadwalan berbasis ML/AI yang menaikkan efisiensi rute sebesar **44.21%** (ukuran internal).',
      'Memimpin digitalisasi dan automasi alur kerja tim transportasi — dari data harian sampai dashboard pemantauan.',
      'Mengembangkan dashboard "Mitra Armada AI" untuk monitor status inspeksi armada secara real-time.',
      'Merancang UI/UX dan pemisahan hak akses Deliveryman vs Monitor Kordel pada aplikasi internal.',
    ],
  },
  {
    role: 'Warehouse Checker',
    company: 'PT. Pekanbaru Distribusindo Raya (Wings Group)',
    period: '2021 — 2024',
    achievements: [
      'Membangun automation tools (auto clicker Python) untuk mempercepat proses Post Good Issue: human error turun **~90%**, hemat waktu verifikasi sekitar **2 jam per hari**.',
    ],
  },
  {
    role: 'Site Engineer',
    company: 'Dinas Perumahan dan Permukiman Kota Medan',
    period: '2019',
    achievements: [
      'Mengawasi implementasi K3 di lapangan untuk menjaga lingkungan kerja tetap aman.',
      'Menjadi penghubung teknis harian antara Site Engineer, subkontraktor, dan logistik agar progres sesuai jadwal.',
      'Aktif menyelesaikan hambatan teknis di lapangan agar spesifikasi dan kualitas konstruksi terjaga.',
    ],
  },
];
