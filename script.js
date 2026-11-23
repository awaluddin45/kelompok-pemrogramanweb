"use strict";

// ========================================
// KONFIGURASI DAN STATE
// ========================================

const WHATSAPP_NUMBER = "6283891722404";

let products = JSON.parse(localStorage.getItem("lensaku_products"));

if (!products || products.length < 40) {
    products = [
        // ================= KAMERA (10 PRODUK) =================
        {
            id: 1,
            name: "Sony Alpha a7 IV",
            brand: "Sony",
            category: "Kamera",
            price: 350000,
            stock: 3,
            description: "Kamera mirrorless full-frame serbaguna untuk foto dan video profesional.",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80",
            specs: ["Sensor 33 MP Full-Frame Exmor R CMOS", "Video 4K 60p 10-bit 4:2:2", "Kelengkapan: Body, Baterai, Charger, Strap, Tas"]
        },
        {
            id: 2,
            name: "Canon EOS R6",
            brand: "Canon",
            category: "Kamera",
            price: 375000,
            stock: 2,
            description: "Performa kecepatan tinggi dan stabilisasi gambar hingga 8-stop.",
            image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=700&q=80",
            specs: ["Sensor 20.1 MP Full-Frame CMOS", "In-Body Image Stabilization 8-Stop", "Kelengkapan: Body, Baterai, Charger, Strap"]
        },
        {
            id: 3,
            name: "Fujifilm X-T5",
            brand: "Fujifilm",
            category: "Kamera",
            price: 275000,
            stock: 4,
            description: "Kamera APS-C desain retro dengan resolusi tinggi 40MP.",
            image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=700&q=80",
            specs: ["Sensor 40.2 MP X-Trans CMOS 5 HR", "Fitur Simulasi Film Klasik Fujifilm", "Kelengkapan: Body, Baterai, Kabel USB-C, Strap"]
        },
        {
            id: 4,
            name: "Sony Alpha a6700",
            brand: "Sony",
            category: "Kamera",
            price: 220000,
            stock: 3,
            description: "Kamera APS-C flagship dengan AI Autofokus tingkat tinggi.",
            image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=700&q=80",
            specs: ["Sensor 26 MP Exmor R APS-C", "Real-time Recognition AF (AI Unit)", "Kelengkapan: Body, Baterai, Charger, Strap"]
        },
        {
            id: 5,
            name: "Canon EOS R10",
            brand: "Canon",
            category: "Kamera",
            price: 180000,
            stock: 4,
            description: "Kamera mirrorless ringkas dan kencang cocok untuk pemula & vlogging.",
            image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=700&q=80",
            specs: ["Sensor 24.2 MP APS-C CMOS", "Continuous shooting 15 fps", "Kelengkapan: Body, Baterai, Charger, Strap"]
        },
        {
            id: 6,
            name: "Lumix GH6",
            brand: "Panasonic",
            category: "Kamera",
            price: 300000,
            stock: 2,
            description: "Kamera monster videografi Micro Four Thirds dengan perekaman ProRes 5.7K.",
            image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80",
            specs: ["Sensor 25.2 MP Live MOS", "Video 5.7K 60p & Internal ProRes", "Kelengkapan: Body, Baterai, Charger, Strap"]
        },
        {
            id: 7,
            name: "Nikon Z6 II",
            brand: "Nikon",
            category: "Kamera",
            price: 320000,
            stock: 3,
            description: "Kamera full-frame hybrid dengan prosesor Dual EXPEED 6.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
            specs: ["Sensor 24.5 MP FX-Format BSI CMOS", "Dual Card Slot (CFexpress/SD)", "Kelengkapan: Body, Baterai, Charger, Strap"]
        },
        {
            id: 8,
            name: "Fujifilm X100VI",
            brand: "Fujifilm",
            category: "Kamera",
            price: 300000,
            stock: 2,
            description: "Kamera kompak premium lensa fixed 23mm f/2 favorit para street photographer.",
            image: "https://images.unsplash.com/photo-1564466809058-bf81182fe93f?auto=format&fit=crop&w=700&q=80",
            specs: ["Sensor 40.2 MP & IBIS 6-Stop", "Lensa Fixed 23mm f/2 (35mm Equivalent)", "Kelengkapan: Unit, Baterai, Lens Cap, Strap"]
        },
        {
            id: 9,
            name: "Sony FX3 Cinema Line",
            brand: "Sony",
            category: "Kamera",
            price: 600000,
            stock: 2,
            description: "Kamera sinematik profesional bentuk ringkas dengan kipas pendingin internal.",
            image: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=700&q=80",
            specs: ["Sensor 12.1 MP Full-Frame Exmor R", "S-Cinetone & dual-base ISO 800/12800", "Kelengkapan: Body, Top Handle XLR, Baterai 2x"]
        },
        {
            id: 10,
            name: "Blackmagic BMPCC 6K Pro",
            brand: "Blackmagic",
            category: "Kamera",
            price: 500000,
            stock: 2,
            description: "Kamera sinema digital berkemampuan rekaman Blackmagic RAW 6K.",
            image: "https://images.unsplash.com/photo-1533319417894-14ca321b5573?auto=format&fit=crop&w=700&q=80",
            specs: ["Sensor Super 35 HDR & Built-in ND Filters", "Blackmagic RAW 6144 x 3456", "Kelengkapan: Body, Batterai 2x, Charger, SSD Holder"]
        },

        // ================= LENSA (5 PRODUK) =================
        {
            id: 11,
            name: "Sony FE 24-70mm f/2.8 GM II",
            brand: "Sony",
            category: "Lensa",
            price: 150000,
            stock: 5,
            description: "Lensa zoom standar profesional bukaan f/2.8 konstan terringkas.",
            image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=700&q=80",
            specs: ["Focal Length 24-70mm", "Aperture Maksimal f/2.8", "Kelengkapan: Lensa, Cap Depan/Belakang, Hood, Pouch"]
        },
        {
            id: 12,
            name: "Canon RF 50mm f/1.2L USM",
            brand: "Canon",
            category: "Lensa",
            price: 120000,
            stock: 3,
            description: "Lensa prime tajam tajam dengan efek bokeh sangat halus.",
            image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=700&q=80",
            specs: ["Focal Length 50mm Prime", "Aperture Maksimal f/1.2 L-Series", "Kelengkapan: Lensa, Cap, Hood, Pouch"]
        },
        {
            id: 13,
            name: "Sigma 85mm f/1.4 DG DN Art",
            brand: "Sigma",
            category: "Lensa",
            price: 110000,
            stock: 4,
            description: "Lensa potret flagship tajam tajam untuk mirrorless Sony E-Mount.",
            image: "https://images.unsplash.com/photo-1514995428455-e97d3b4151e1?auto=format&fit=crop&w=700&q=80",
            specs: ["Focal Length 85mm Portrait", "Aperture f/1.4 Art Series", "Kelengkapan: Lensa, Tutup Depan/Belakang, Hood"]
        },
        {
            id: 14,
            name: "Fujinon XF 16-55mm f/2.8 R LM WR",
            brand: "Fujifilm",
            category: "Lensa",
            price: 100000,
            stock: 3,
            description: "Lensa zoom flagship serbaguna tahan cuaca untuk seri Fujifilm X.",
            image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=700&q=80",
            specs: ["Focal Length 16-55mm (24-84mm Equivalent)", "Aperture f/2.8 konstan", "Kelengkapan: Lensa, Cap Depan/Belakang, Hood"]
        },
        {
            id: 15,
            name: "Tamron 28-75mm f/2.8 G2",
            brand: "Tamron",
            category: "Lensa",
            price: 90000,
            stock: 4,
            description: "Lensa zoom favorit serbaguna ringan dengan performa autofokus kencang.",
            image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=700&q=80",
            specs: ["Focal Length 28-75mm (Full-Frame)", "Aperture f/2.8 konstan G2 Series", "Kelengkapan: Lensa, Front/Rear Cap, Hood"]
        },

        // ================= VIDEO (5 PRODUK) =================
        {
            id: 16,
            name: "DJI Ronin RS 3 Pro",
            brand: "DJI",
            category: "Video",
            price: 200000,
            stock: 3,
            description: "Gimbal motorized berbahan serat karbon untuk sistem kamera profesional.",
            image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=700&q=80",
            specs: ["Payload Maksimal 4.5 kg", "Layar Sentuh OLED 1.8 Inci", "Kelengkapan: Gimbal, BG30 Grip, Quick Release Plate, Cable Set"]
        },
        {
            id: 17,
            name: "Zhiyun Weebill 3S",
            brand: "Zhiyun",
            category: "Video",
            price: 130000,
            stock: 4,
            description: "Gimbal ergonomis dengan Sling Mode & built-in fill light.",
            image: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=700&q=80",
            specs: ["Desain Ergonomis Sling Grip 2.5", "Built-in Fill Light 1000 Lux", "Kelengkapan: Gimbal, Tripod Base, Kabel Kontrol"]
        },
        {
            id: 18,
            name: "Atomos Ninja V Monitor",
            brand: "Atomos",
            category: "Video",
            price: 120000,
            stock: 3,
            description: "Monitor recorder lapangan 5 inci HDR 1000 nits perekam ProRes RAW.",
            image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80",
            specs: ["Layar 5.2 Inci 1000 nits HDR", "Perekaman ProRes RAW via HDMI", "Kelengkapan: Monitor, Baterai NP-F 2x, Charger, Kabel HDMI"]
        },
        {
            id: 19,
            name: "Hollyland Mars 400S Pro",
            brand: "Hollyland",
            category: "Video",
            price: 150000,
            stock: 2,
            description: "Sistem transmisi video nirkabel SDI/HDMI jangkauan hingga 120m.",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=700&q=80",
            specs: ["Jangkauan Transmission 120 meter", "Latensi sangat rendah 0.08 detik", "Kelengkapan: Transmitter, Receiver, Antena, Baterai NP-F 2x"]
        },
        {
            id: 20,
            name: "Feelworld LUT7 7 Inch",
            brand: "Feelworld",
            category: "Video",
            price: 85000,
            stock: 4,
            description: "Monitor eksternal super terang 2200 nits tetap terlihat di bawah terik matahari.",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=700&q=80",
            specs: ["Kecerahan Layar 2200 nits Ultra-Bright", "3D LUT Support via SD Card", "Kelengkapan: Monitor, Tilt Arm, Baterai NP-F, Kabel HDMI"]
        },

        // ================= AUDIO (5 PRODUK) =================
        {
            id: 21,
            name: "Rode Wireless GO II",
            brand: "Rode",
            category: "Audio",
            price: 90000,
            stock: 6,
            description: "Mikrofon nirkabel ultra-kompak dual channel perekam internal.",
            image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=700&q=80",
            specs: ["Dual-Channel Wireless Mic", "Transmisi 200m & On-board Recording", "Kelengkapan: 1 Receiver, 2 Transmitter, Deadcat, Cable Set"]
        },
        {
            id: 22,
            name: "Hollyland Lark Max",
            brand: "Hollyland",
            category: "Audio",
            price: 85000,
            stock: 5,
            description: "Mic wireless dengan studio-quality audio dan ENC noise-cancelling.",
            image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=700&q=80",
            specs: ["48kHz / 24-bit Studio Quality Audio", "Internal Memory 8GB (Hingga 14 Jam)", "Kelengkapan: Charging Case, 2 TX, 1 RX, Kabel Complete"]
        },
        {
            id: 23,
            name: "Sennheiser MKE 600",
            brand: "Sennheiser",
            category: "Audio",
            price: 95000,
            stock: 3,
            description: "Mikrofon shotgun profesional terarah fokus suara jernih.",
            image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=700&q=80",
            specs: ["Supercardioid/Lobar Pick-up Pattern", "Power: Phantom Power 48V / Baterai AA", "Kelengkapan: Mic, Shockmount, Busa Windscreen, Kabel XLR to 3.5mm"]
        },
        {
            id: 24,
            name: "Zoom H6 Handy Recorder",
            brand: "Zoom",
            category: "Audio",
            price: 110000,
            stock: 3,
            description: "Perekam audio portabel 6-track dengan kapsul mikrofon yang dapat ditukar.",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80",
            specs: ["Perekaman hingga 6 Channel", "4 Input XLR/TRS combo", "Kelengkapan: Recorder, Kapsul X/Y, SD Card 32GB, Hard Case"]
        },
        {
            id: 25,
            name: "DJI Mic 2",
            brand: "DJI",
            category: "Audio",
            price: 100000,
            stock: 5,
            description: "Mikrofon wireless terbaru dengan fitur 32-bit float internal recording.",
            image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=700&q=80",
            specs: ["32-bit Float Internal Recording", "Intelligent Noise Cancelling", "Kelengkapan: Charging Case, 2 TX, 1 RX, Magnet Mount, Adapter"]
        },

        // ================= AKSESORIS (5 PRODUK) =================
        {
            id: 26,
            name: "Godox SL60W LED Light",
            brand: "Godox",
            category: "Aksesoris",
            price: 80000,
            stock: 4,
            description: "Lampu studio continuous 60W daylight mulus untuk foto & video.",
            image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=700&q=80",
            specs: ["Daya 60W Daylight 5600K", "Bowens Mount kompatibel berbagai modifier", "Kelengkapan: Lampu, Standard Reflector, Kabel Power, Remote"]
        },
        {
            id: 27,
            name: "Aputure Amaran 200d COB",
            brand: "Aputure",
            category: "Aksesoris",
            price: 150000,
            stock: 3,
            description: "Lampu LED COB super terang 200W kontrol via aplikasi Sidus Link.",
            image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=700&q=80",
            specs: ["Output Daya 200W Daylight 5600K", "Sidus Link App Bluetooth Control", "Kelengkapan: Lampu Unit, Reflector 55°, Adapter & Kabel"]
        },
        {
            id: 28,
            name: "Peak Design Carbon Tripod",
            brand: "Peak Design",
            category: "Aksesoris",
            price: 75000,
            stock: 5,
            description: "Tripod travel serat karbon ultra-kompak kokoh serta ringan.",
            image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=700&q=80",
            specs: ["Bahan Carbon Fiber Ringan", "Beban Maksimal 9.1 kg", "Kelengkapan: Tripod, Arca Swiss Plate, Mobile Mount, Soft Case"]
        },
        {
            id: 29,
            name: "Nanlite Forza 60B II Bi-Color",
            brand: "Nanlite",
            category: "Aksesoris",
            price: 120000,
            stock: 3,
            description: "Lampu COB ringkas bi-color 2700K-6500K fleksibel di segala suasana.",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80",
            specs: ["Temperatur Warna 2700K-6500K", "Daya Ringkas 72W", "Kelengkapan: Lampu Forza 60B II, Reflector, Power Adapter, Bag"]
        },
        {
            id: 30,
            name: "SanDisk CFexpress 512GB",
            brand: "SanDisk",
            category: "Aksesoris",
            price: 60000,
            stock: 8,
            description: "Memory card kecepatan tinggi Type B baca hingga 1700MB/s untuk video 8K/4K.",
            image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=700&q=80",
            specs: ["Kapasitas 512GB Type B", "Kecepatan Baca Hingga 1700 MB/s", "Kelengkapan: Card, Case, Card Reader Type-C"]
        },

        // ================= HANDPHONE (10 PRODUK) =================
        {
            id: 31,
            name: "iPhone 15 Pro Max 256GB",
            brand: "Apple",
            category: "Handphone",
            price: 300000,
            stock: 4,
            description: "Flagship Apple bodi Titanium, Chip A17 Pro, & fitur Log VideoRecording.",
            image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80",
            specs: ["Kamera Utama 48MP & 5x Telephoto", "Apple ProRes & Log Video", "Kelengkapan: Unit iPhone, Kabel Type-C, Softcase"]
        },
        {
            id: 32,
            name: "iPhone 14 Pro 128GB",
            brand: "Apple",
            category: "Handphone",
            price: 220000,
            stock: 5,
            description: "Layar Dynamic Island interaktif & kamera Pro 48 MP untuk konten harian.",
            image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=700&q=80",
            specs: ["Kamera 48MP dengan Action Mode", "Layar Always-On OLED 120Hz", "Kelengkapan: Unit iPhone, Kabel Lightning, Case"]
        },
        {
            id: 33,
            name: "Samsung Galaxy S24 Ultra",
            brand: "Samsung",
            category: "Handphone",
            price: 320000,
            stock: 3,
            description: "HP fotografi terbaik 200 MP dilengkapi S-Pen & fitur Galaxy AI.",
            image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=80",
            specs: ["Kamera Utama 200 MP + 100x Space Zoom", "S-Pen & Snapdragon 8 Gen 3", "Kelengkapan: Unit HP, S-Pen, Kabel Type-C, Case"]
        },
        {
            id: 34,
            name: "Samsung Galaxy S23 Ultra",
            brand: "Samsung",
            category: "Handphone",
            price: 250000,
            stock: 4,
            description: "Performa konsisten tangguh dengan zoom optik 10x dan rekaman 8K.",
            image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80",
            specs: ["Kamera 200 MP Nightography", "Optik Zoom 10x Optical", "Kelengkapan: Unit HP, S-Pen, Kabel Type-C"]
        },
        {
            id: 35,
            name: "Google Pixel 8 Pro",
            brand: "Google",
            category: "Handphone",
            price: 200000,
            stock: 3,
            description: "Hasil foto natural terbaik dengan pemrosesan komputasi AI Google Tensor G3.",
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80",
            specs: ["Kamera 50 MP dengan Best Take AI", "Layar Super Actua Display 2400 nits", "Kelengkapan: Unit HP, Kabel USB-C, Softcase"]
        },
        {
            id: 36,
            name: "Vivo X100 Pro",
            brand: "Vivo",
            category: "Handphone",
            price: 230000,
            stock: 3,
            description: "Kamera ZEISS APO Floating Telephoto 1 inci sangat jernih.",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80",
            specs: ["Sensor Utama 1 Inci Sony IMX989", "Optik Lensa ZEISS T* Coating", "Kelengkapan: Unit HP, Charger FlashCharge 100W, Case"]
        },
        {
            id: 37,
            name: "Xiaomi 14 Ultra",
            brand: "Xiaomi",
            category: "Handphone",
            price: 280000,
            stock: 2,
            description: "Desain fotografi ala kamera saku dengan sistem quad-camera Leica.",
            image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=700&q=80",
            specs: ["Quad Camera 50 MP Leica Summilux", "Aperture Variabel f/1.63-f/4.0", "Kelengkapan: Unit HP, Fast Charger 90W, Case"]
        },
        {
            id: 38,
            name: "iPhone 13 Pro 128GB",
            brand: "Apple",
            category: "Handphone",
            price: 170000,
            stock: 5,
            description: "Favorit videografer handphone hemat dengan fitur Cinematic Mode.",
            image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=700&q=80",
            specs: ["Layar ProMotion 120Hz", "Cinematic Mode Video Recording", "Kelengkapan: Unit iPhone, Kabel Lightning, Case"]
        },
        {
            id: 39,
            name: "Samsung Galaxy Z Fold 5",
            brand: "Samsung",
            category: "Handphone",
            price: 350000,
            stock: 2,
            description: "HP lipat layar luas cocok untuk multitasking & monitoring rekaman.",
            image: "https://images.unsplash.com/photo-1584006682522-dc17d6c0d963?auto=format&fit=crop&w=700&q=80",
            specs: ["Layar Utama Lipat 7.6 Inci Dynamic AMOLED 2X", "Multitasking 3 Aplikasi Sekaligus", "Kelengkapan: Unit Fold, Kabel Type-C, Protective Case"]
        },
        {
            id: 40,
            name: "ASUS ROG Phone 8 Pro",
            brand: "ASUS",
            category: "Handphone",
            price: 240000,
            stock: 3,
            description: "HP gaming monster dengan 6-Axis Hybrid Gimbal Stabilizer 3.0.",
            image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=700&q=80",
            specs: ["Chipset Snapdragon 8 Gen 3 & RAM 16GB", "6-Axis Hybrid Gimbal Stabilizer", "Kelengkapan: Unit ROG, Cooler Fan, Charger 65W, Case"]
        }
    ];

    localStorage.setItem("lensaku_products", JSON.stringify(products));
}

let toastTimer;

const state = {
    category: "Semua",
    search: "",
    cart: JSON.parse(localStorage.getItem("lensaku_cart")) || {} 
};

function saveCart() {
    localStorage.setItem("lensaku_cart", JSON.stringify(state.cart));
}

// ELEMEN HTML
const $ = (selector) => document.querySelector(selector);

const productGrid = $("#productGrid");
const cartModal = $("#cartModal");
const cartItems = $("#cartItems");
const cartCount = $("#cartCount");
const searchInput = $("#searchInput");
const startDateInput = $("#startDate");
const endDateInput = $("#endDate");
const toastElement = $("#toast");
const checkoutButton = $("#checkoutBtn");
const historyModal = $("#historyModal");
const historyNavBtn = $("#historyNavBtn");
const historyItemsList = $("#historyItemsList");
const navLinks = $("#navLinks");

// UTILITAS
const rupiah = (amount) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(Number(amount) || 0);

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function showToast(message) {
    if (!toastElement) {
        alert(message);
        return;
    }

    toastElement.textContent = message;
    toastElement.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toastElement.classList.remove("show");
    }, 2600);
}

function dateToLocalISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getRentalDays() {
    const start = startDateInput.value;
    const end = endDateInput.value;

    if (!start || !end || end <= start) {
        return 0;
    }

    const startTime = new Date(`${start}T00:00:00Z`).getTime();
    const endTime = new Date(`${end}T00:00:00Z`).getTime();

    return Math.round((endTime - startTime) / 86400000);
}

function getProduct(productId) {
    return products.find((product) => product.id === Number(productId));
}

function formatAvailability(product) {
    return `Tersedia ${product.stock} unit`;
}

// MEMUAT PRODUK
function loadProducts() {
    const savedProducts = JSON.parse(localStorage.getItem("lensaku_products"));
    if (savedProducts) {
        products = savedProducts;
    }

    checkExpiredRentals();
    renderProducts();
    renderCart();
}

// RIWAYAT PENYEWAAN
function renderHistory() {
    if (!historyItemsList) return;

    const orderHistory = JSON.parse(localStorage.getItem("lensaku_history")) || [];

    if (orderHistory.length === 0) {
        historyItemsList.innerHTML = `
            <div class="empty-cart">
                Belum ada riwayat penyewaan di perangkat ini.
            </div>
        `;
        return;
    }

    historyItemsList.innerHTML = orderHistory.map(order => `
        <div style="padding: 16px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface-2); margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid var(--border); padding-bottom: 8px;">
                <strong style="font-size: 13px; color: var(--text);">Pesanan #${order.orderId}</strong>
                <span style="color: var(--muted); font-size: 11px;">${order.createdAt || order.date || '-'}</span>
            </div>
            <div style="font-size: 11px; color: var(--muted); margin-bottom: 8px;">
                <div>Periode: <span style="color: var(--text);">${order.startDate} s/d ${order.endDate}</span> (${order.days} hari)</div>
            </div>
            <div style="font-size: 11px; margin-bottom: 10px;">
                <div style="color: var(--muted); margin-bottom: 4px;">Perlengkapan:</div>
                <ul style="padding-left: 15px; color: #eee;">
                    ${order.items.map(i => `<li>${i.name} (x${i.quantity})</li>`).join("")}
                </ul>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: bold; border-top: 1px solid var(--border); padding-top: 8px;">
                <span style="color: var(--muted);">Total Estimasi:</span>
                <span style="color: var(--orange); font-size: 14px;">${rupiah(order.total)}</span>
            </div>
        </div>
    `).join("");
}

function openHistory() {
    if (historyModal) {
        historyModal.hidden = false;
        document.body.classList.add("modal-open");
        renderHistory();
    }
}

function closeHistory() {
    if (historyModal) {
        historyModal.hidden = true;
        document.body.classList.remove("modal-open");
    }
}

historyNavBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openHistory();
    navLinks?.classList.remove("open");
});

historyModal?.addEventListener("click", (event) => {
    if (event.target === historyModal) {
        closeHistory();
    }
});

// KATALOG DAN FILTER PRODUK
function renderProducts() {
    if (!productGrid) return;

    const keyword = state.search.toLowerCase();

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            state.category === "Semua" ||
            product.category === state.category;

        const searchableText = [
            product.name,
            product.brand,
            product.category,
            product.description
        ]
            .map((value) => String(value ?? "").toLowerCase())
            .join(" ");

        return matchesCategory && searchableText.includes(keyword);
    });

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div class="empty-state">
                Produk tidak ditemukan. Coba kata kunci lain.
            </div>
        `;
        return;
    }

    productGrid.innerHTML = filteredProducts.map((product) => {
        return `
            <article class="product-card">
                <div class="product-image-wrap">
                    <img
                        class="product-image"
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='https://placehold.co/600x400/191919/0066ff?text=Lensaku';"
                    >
                    <span class="product-category">
                        ${escapeHTML(product.category || "Lainnya")}
                    </span>
                </div>

                <div class="product-body">
                    <span class="product-brand">
                        ${escapeHTML(product.brand || "")}
                    </span>

                    <h3 class="product-name">
                        ${escapeHTML(product.name)}
                    </h3>

                    <p class="product-description">
                        ${escapeHTML(product.description || "")}
                    </p>

                    <p class="product-availability">
                        ${escapeHTML(formatAvailability(product))}
                    </p>

                    <div class="product-divider"></div>

                    <div class="product-bottom">
                        <div class="product-price">
                            <small>Mulai dari</small>
                            <strong>${rupiah(product.price)}</strong>
                            <small>/ hari</small>
                        </div>

                        <button
                            class="add-cart"
                            data-add="${product.id}"
                            aria-label="Tambah ${escapeHTML(product.name)} ke keranjang"
                            title="Tambah ke keranjang"
                        >+</button>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

const categoryFilters = $("#categoryFilters");

categoryFilters?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    state.category = button.dataset.category;

    document.querySelectorAll(".filter-btn").forEach((item) => {
        item.classList.toggle("active", item === button);
    });

    renderProducts();
});

searchInput?.addEventListener("input", () => {
    state.search = searchInput.value.trim();
    renderProducts();
});

productGrid?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");
    if (!button) return;

    addToCart(Number(button.dataset.add));
});

// KERANJANG SEWA
function addToCart(productId) {
    const product = getProduct(productId);
    if (!product) return;

    const currentQuantity = state.cart[productId] || 0;

    if (currentQuantity >= product.stock) {
        showToast("Jumlah melebihi stok yang tersedia.");
        return;
    }

    state.cart[productId] = currentQuantity + 1;
    saveCart();

    renderProducts();
    renderCart();

    showToast(`${product.name} ditambahkan ke keranjang.`);
}

function changeQuantity(productId, change) {
    const product = getProduct(productId);
    if (!product) return;

    const current = state.cart[productId] || 0;
    const next = current + change;

    if (change > 0 && next > product.stock) {
        showToast("Stok tidak mencukupi untuk jumlah tersebut.");
        return;
    }

    if (next <= 0) {
        delete state.cart[productId];
    } else {
        state.cart[productId] = next;
    }

    saveCart();

    renderProducts();
    renderCart();
}

function getSubtotal() {
    return Object.entries(state.cart).reduce(
        (total, [id, quantity]) => {
            const product = getProduct(id);
            return total + (product ? product.price * quantity : 0);
        },
        0
    );
}

function renderCart() {
    if (!cartItems || !cartCount) return;

    const entries = Object.entries(state.cart);
    const itemCount = entries.reduce(
        (sum, [, quantity]) => sum + quantity,
        0
    );

    cartCount.textContent = itemCount;
    cartItems.innerHTML = "";

    if (entries.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                Keranjangmu masih kosong.<br>
                Pilih perlengkapan dari katalog terlebih dahulu.
            </div>
        `;
    } else {
        cartItems.innerHTML = entries.map(([id, quantity]) => {
            const product = getProduct(id);
            if (!product) return "";

            const cannotAddMore = quantity >= product.stock;

            return `
                <article class="cart-item">
                    <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">
                    <div>
                        <h4>${escapeHTML(product.name)}</h4>
                        <p>${rupiah(product.price)} / hari</p>

                        <div class="quantity-controls">
                            <button data-change="-1" data-id="${product.id}" aria-label="Kurangi jumlah">−</button>
                            <span>${quantity}</span>
                            <button data-change="1" data-id="${product.id}" aria-label="Tambah jumlah" ${cannotAddMore ? "disabled" : ""}>+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-remove="${product.id}" aria-label="Hapus ${escapeHTML(product.name)}">×</button>
                </article>
            `;
        }).join("");
    }

    const days = getRentalDays();
    const subtotal = getSubtotal();
    const invalidDates = days < 1;

    $("#rentalDuration").textContent = invalidDates ? "-" : `${days} hari`;
    $("#subtotal").textContent = rupiah(subtotal);
    $("#grandTotal").textContent = rupiah(subtotal * (days || 0));

    if (checkoutButton) {
        checkoutButton.disabled = entries.length === 0 || invalidDates;
    }
}

cartItems?.addEventListener("click", (event) => {
    const changeButton = event.target.closest("[data-change]");
    const removeButton = event.target.closest("[data-remove]");

    if (changeButton) {
        changeQuantity(
            Number(changeButton.dataset.id),
            Number(changeButton.dataset.change)
        );
    }

    if (removeButton) {
        delete state.cart[Number(removeButton.dataset.remove)];
        saveCart();
        renderProducts();
        renderCart();
        showToast("Produk dihapus dari keranjang.");
    }
});

// TANGGAL PENYEWAAN
function setupDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayISO = dateToLocalISO(today);
    const tomorrowISO = dateToLocalISO(tomorrow);

    startDateInput.min = todayISO;
    endDateInput.min = tomorrowISO;

    startDateInput.value = todayISO;
    endDateInput.value = tomorrowISO;
}

startDateInput?.addEventListener("change", () => {
    if (!startDateInput.value) return;

    const nextDay = new Date(`${startDateInput.value}T00:00:00`);
    nextDay.setDate(nextDay.getDate() + 1);
    const minimumEnd = dateToLocalISO(nextDay);

    endDateInput.min = minimumEnd;

    if (!endDateInput.value || endDateInput.value < minimumEnd) {
        endDateInput.value = minimumEnd;
    }

    renderCart();
});

endDateInput?.addEventListener("change", () => {
    renderCart();
});

// BUKA DAN TUTUP KERANJANG
function openCart() {
    cartModal.hidden = false;
    document.body.classList.add("modal-open");
    renderCart();
}

function closeCart() {
    cartModal.hidden = true;
    document.body.classList.remove("modal-open");
}

$("#cartFab")?.addEventListener("click", openCart);

cartModal?.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        closeCart();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && cartModal && !cartModal.hidden) {
        closeCart();
    }
    if (event.key === "Escape" && historyModal && !historyModal.hidden) {
        closeHistory();
    }
});

// CHECKOUT DAN WHATSAPP
checkoutButton?.addEventListener("click", () => {
    const entries = Object.entries(state.cart);

    if (entries.length === 0) {
        showToast("Keranjang masih kosong.");
        return;
    }

    const customerName = $("#customerName").value.trim();
    const note = $("#customerNote").value.trim();
    const start = startDateInput.value;
    const end = endDateInput.value;

    if (!customerName) {
        $("#customerName").focus();
        showToast("Masukkan nama penyewa terlebih dahulu.");
        return;
    }

    if (!start || !end || end <= start) {
        showToast("Pilih tanggal sewa yang valid.");
        return;
    }

    if (!WHATSAPP_NUMBER.trim()) {
        showToast("Nomor WhatsApp belum ditentukan.");
        return;
    }

    const days = getRentalDays();
    const subtotalPerDay = getSubtotal();
    const grandTotal = subtotalPerDay * days;
    const randomOrderNumber = Math.floor(1000 + Math.random() * 9000);

    const cartItemsData = entries.map(([id, quantity]) => {
        const product = getProduct(id);
        return {
            id: Number(id),
            name: product ? product.name : "Produk",
            price: product ? product.price : 0,
            quantity: Number(quantity)
        };
    });

    const lines = [
        "*PERMINTAAN SEWA LENSAKU*",
        "",
        `Nomor pesanan: #${randomOrderNumber}`,
        `Nama: ${customerName}`,
        `Tanggal mulai: ${start}`,
        `Tanggal selesai: ${end}`,
        `Durasi: ${days} hari`,
        "",
        "*Daftar perlengkapan:*"
    ];

    entries.forEach(([id, quantity]) => {
        const product = getProduct(id);
        if (!product) return;

        lines.push(
            `- ${product.name} x${quantity}`,
            `  ${rupiah(product.price)} x ${quantity} x ${days} hari`
        );
    });

    lines.push(
        "",
        `Subtotal per hari: ${rupiah(subtotalPerDay)}`,
        `*Estimasi total: ${rupiah(grandTotal)}*`,
        "",
        `Catatan: ${note || "-"}`,
        "",
        "Mohon konfirmasi ketersediaan barang dan ketentuan sewa. Terima kasih."
    );

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

    const newOrder = {
        orderId: randomOrderNumber,
        customerName: customerName,
        startDate: start,
        endDate: end,
        days: days,
        items: cartItemsData,
        total: grandTotal,
        status: "pending", 
        createdAt: new Date().toLocaleDateString("id-ID")
    };

    let orderHistory = JSON.parse(localStorage.getItem("lensaku_history")) || [];
    orderHistory.unshift(newOrder);
    if (orderHistory.length > 20) orderHistory.pop();
    localStorage.setItem("lensaku_history", JSON.stringify(orderHistory));

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    state.cart = {};
    saveCart();
    renderProducts();
    renderCart();
    closeCart();

    showToast("Pesanan berhasil dibuat, mengalihkan ke WhatsApp...");
});

// MENU MOBILE DAN NAVIGASI
const menuToggle = $("#menuToggle");

menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "CLOSE" : "MENU";
});

navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "MENU";
    });
});

document.querySelectorAll("[data-footer-category]").forEach((link) => {
    link.addEventListener("click", () => {
        const category = link.dataset.footerCategory;
        state.category = category;

        document.querySelectorAll(".filter-btn").forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.category === category
            );
        });

        renderProducts();
    });
});

$("#contactLink")?.addEventListener("click", (event) => {
    event.preventDefault();
    if (!WHATSAPP_NUMBER.trim()) {
        showToast("Nomor WhatsApp belum dikonfigurasi.");
        return;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener,noreferrer");
});

// INISIALISASI
const currentYear = $("#currentYear");
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

function checkExpiredRentals() {
    const activeRentals = JSON.parse(localStorage.getItem("lensaku_active_rentals")) || [];
    let orderHistory = JSON.parse(localStorage.getItem("lensaku_history")) || [];
    const today = dateToLocalISO(new Date());
    let dataChanged = false;

    const remainingRentals = activeRentals.filter(rental => {
        if (rental.endDate < today) {
            rental.items.forEach(item => {
                const product = getProduct(item.id);
                if (product) {
                    product.stock += item.quantity;
                }
            });
            
            const targetOrder = orderHistory.find(o => o.orderId === rental.orderId);
            if (targetOrder) targetOrder.status = "completed";
            
            dataChanged = true;
            return false; 
        }
        return true; 
    });

    if (dataChanged) {
        localStorage.setItem("lensaku_active_rentals", JSON.stringify(remainingRentals));
        localStorage.setItem("lensaku_history", JSON.stringify(orderHistory));
        localStorage.setItem("lensaku_products", JSON.stringify(products));
    }
}

setupDates();
loadProducts();

// DETAIL PRODUK (MODAL)
const productDetailModal = $("#productDetailModal");
const detailProductImage = $("#detailProductImage");
const detailProductBrand = $("#detailProductBrand");
const detailProductName = $("#detailProductName");
const detailProductCategory = $("#detailProductCategory");
const detailProductPrice = $("#detailProductPrice");
const detailProductDescription = $("#detailProductDescription");
const detailProductStock = $("#detailProductStock");
const detailAddToCartBtn = $("#detailAddToCartBtn");

let activeDetailProductId = null;

function openProductDetail(productId) {
    const product = getProduct(productId);
    if (!product) return;

    activeDetailProductId = product.id;

    detailProductImage.src = product.image;
    detailProductBrand.textContent = (product.brand || "").toUpperCase();
    detailProductName.textContent = product.name;
    detailProductCategory.textContent = product.category || "Lainnya";
    detailProductPrice.textContent = `${rupiah(product.price)} / hari`;
    detailProductDescription.textContent = product.description || "Tidak ada deskripsi.";
    detailProductStock.textContent = formatAvailability(product);

    const specsContainer = $("#detailProductSpecs");
    if (specsContainer) {
        const specsList = product.specs || [
            "Kondisi fisik: Mulus 98% (Normal & Siap Pakai)",
            "Kelengkapan: Unit, Baterai Original, & Charger",
            "Garansi fungsi 1x24 jam setelah barang diterima"
        ];
        specsContainer.innerHTML = specsList.map(spec => `<li>${spec}</li>`).join("");
    }

    productDetailModal.hidden = false;
    document.body.classList.add("modal-open");
}

function closeProductDetail() {
    productDetailModal.hidden = true;
    document.body.classList.remove("modal-open");
    activeDetailProductId = null;
}

productGrid?.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add]");
    if (addButton) return;

    const card = event.target.closest(".product-card");
    if (!card) return;

    const addBtnInside = card.querySelector("[data-add]");
    if (addBtnInside) {
        openProductDetail(Number(addBtnInside.dataset.add));
    }
});

detailAddToCartBtn?.addEventListener("click", () => {
    if (activeDetailProductId !== null) {
        addToCart(activeDetailProductId);
        closeProductDetail();
    }
});

productDetailModal?.addEventListener("click", (event) => {
    if (event.target === productDetailModal) {
        closeProductDetail();
    }
});

document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => {
        closeCart();
        closeHistory();
        closeProductDetail();
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && productDetailModal && !productDetailModal.hidden) {
        closeProductDetail();
    }
});
