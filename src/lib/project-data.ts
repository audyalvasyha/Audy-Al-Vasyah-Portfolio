export const projectDetails = [
  {
    id: 'ai-tire-inspection',
    title: 'Aplikasi Inspeksi Ban Berbasis AI',
    description:
      'Menyederhanakan inspeksi ban menggunakan teknologi AI untuk meningkatkan keamanan dan efisiensi armada, menampilkan dasbor supervisor untuk pemantauan waktu nyata.',
    features: [
      'Perampingan inspeksi ban dengan AI untuk meningkatkan keamanan & efisiensi armada.',
      'Dasbor supervisor untuk pemantauan status inspeksi waktu nyata.',
    ],
    technologies: ['Next.js', 'React', 'AI', 'Machine Learning', 'Google Gemini'],
    imageHint: 'Gambar aplikasi inspeksi ban berbasis AI',
    imageWidth: 1280,
    imageHeight: 832,
    alt: 'Tampilan antarmuka aplikasi inspeksi ban berbasis AI yang menampilkan dasbor analitik.',
  },
  {
    id: 'saldoin-topup',
    title: 'SaldoIn - Top Up Game & Voucher E-commerce',
    description:
      'Platform e-commerce untuk top-up game dan voucher yang mengutamakan kecepatan transaksi, keamanan data, dan pengalaman pengguna yang optimal dengan arsitektur modern.',
    features: [
      'Implementasi sistem pembayaran yang terintegrasi untuk berbagai metode (misalnya QRIS, Virtual Account).',
      'Manajemen inventaris digital (voucher dan produk game) secara real-time.',
      'Dirancang dengan keamanan data pengguna dan transaksi yang solid, memanfaatkan keahlian di Google Cloud Platform (GCP) dan Firebase.',
      'Antarmuka pengguna yang responsif, modern, dan sederhana untuk navigasi produk yang cepat.',
    ],
    technologies: ['Next.js', 'React', 'Firebase', 'Google Cloud', 'E-commerce'],
    imageHint: 'toko top up game online',
    imageWidth: 1080,
    imageHeight: 1080,
    alt: 'Halaman utama platform e-commerce SaldoIn untuk top up game dan voucher.',
  },
  {
    id: 'n8n-spv-reply-workflow',
    title: 'Sistem Automation Notify SKR',
    description:
      'Alur kerja otomasi n8n yang menerima pesan webhook (misalnya dari WhatsApp/Wablas), mengklasifikasikan niat pesan menggunakan AI (Google Gemini), dan mengarahkan balasan berdasarkan logika "Switch" secara otomatis.',
    features: [
      'Menerima data secara real-time melalui node Webhook dari layanan eksternal.',
      'Integrasi dengan Google Gemini Chat Model untuk pemrosesan bahasa alami (NLP) dan klasifikasi niat balasan.',
      'Pemanfaatan node "AI Agent" untuk mengelola prompt dan interaksi dengan model AI secara efektif.',
      'Logika percabangan dinamis (dynamic branching) menggunakan node "Switch" untuk memisahkan alur kerja berdasarkan output AI (misal: Setuju, Tolak, Ragu).',
      'Mengirimkan balasan atau memicu aksi yang berbeda (via "HTTP Request") untuk setiap skenario yang telah ditentukan.',
    ],
    technologies: ['n8n', 'Google Gemini', 'Webhook', 'Automation'],
    imageHint: 'n8n workflow webhook ai agent gemini switch',
    imageWidth: 1080,
    imageHeight: 1080,
    alt: 'Tangkapan layar alur kerja n8n yang menunjukkan node Webhook, AI Agent dengan model Google Gemini, dan node Switch dengan tiga cabang keluaran.',
  },
  {
    id: 'auto-clicker-pgi',
    title: 'Automasi Proses Post Good Issue (PGI)',
    description: 'Mengembangkan dan memanfaatkan Automation Tools (Auto Clicker) untuk mempercepat proses Post Good Issue, secara signifikan mengurangi potensi human error hingga 90% dan meningkatkan efisiensi operasional gudang.',
    features: [
        'Automasi penuh pada proses PGI yang repetitif.',
        'Mengurangi kesalahan input data manual hingga 90%.',
        'Mempercepat waktu siklus proses PGI secara drastis.',
        'Dibangun menggunakan skrip yang ringan dan mudah di-maintain.'
    ],
    technologies: ['Python', 'UI Automation', 'Scripting'],
    imageHint: 'Ilustrasi robot atau script yang melakukan automasi pada antarmuka komputer gudang',
    imageWidth: 1080,
    imageHeight: 1080,
    alt: 'Ilustrasi alur kerja automasi untuk proses Post Good Issue di gudang.'
  }
];
