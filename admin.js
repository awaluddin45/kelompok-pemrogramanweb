"use strict";

const toastElement = document.getElementById("toast");

const ADMIN_USER = "admin";
const ADMIN_PASS = "lensaku123";

function showToast(message) {
    if (!toastElement) {
        alert(message);
        return;
    }
    toastElement.textContent = message;
    toastElement.classList.add("show");
    setTimeout(() => {
        toastElement.classList.remove("show");
    }, 2600);
}

function rupiah(amount) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(Number(amount) || 0);
}

// Cek Status Login Saat Halaman Dimuat
function updateView() {
    const loginSec = document.getElementById("loginSection");
    const dashSec = document.getElementById("dashboardSection");
    
    const isLogged = sessionStorage.getItem("lensaku_logged") === "yes";

    if (isLogged) {
        if (loginSec) loginSec.style.display = "none";
        if (dashSec) dashSec.style.display = "flex";
        loadAdminData();
    } else {
        if (loginSec) loginSec.style.display = "flex";
        if (dashSec) dashSec.style.display = "none";
    }
}

function processLogin() {
    const uInput = document.getElementById("adminUser")?.value.trim() || "";
    const pInput = document.getElementById("adminPass")?.value.trim() || "";

    if (uInput === ADMIN_USER && pInput === ADMIN_PASS) {
        sessionStorage.setItem("lensaku_logged", "yes");
        showToast("Login berhasil!");
        setTimeout(() => {
            updateView();
        }, 400);
    } else {
        showToast("Username atau Password salah!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateView();

    // Tombol Login
    const loginBtn = document.getElementById("loginBtn");
    loginBtn?.addEventListener("click", processLogin);

    // Fitur Tekan Enter untuk Login
    const adminUser = document.getElementById("adminUser");
    const adminPass = document.getElementById("adminPass");

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            processLogin();
        }
    };

    adminUser?.addEventListener("keydown", handleEnter);
    adminPass?.addEventListener("keydown", handleEnter);

    // Tombol Logout
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn?.addEventListener("click", () => {
        sessionStorage.removeItem("lensaku_logged");
        showToast("Berhasil keluar.");
        updateView();
    });

    // Event Listener untuk Pencarian & Filter
    document.getElementById("searchOrderInput")?.addEventListener("input", loadAdminData);
    document.getElementById("filterStatusSelect")?.addEventListener("change", loadAdminData);

    document.getElementById("exportCsvBtn")?.addEventListener("click", () => {
        const orderHistory = JSON.parse(localStorage.getItem("lensaku_history")) || [];

        if (orderHistory.length === 0) {
            showToast("Tidak ada data transaksi untuk di-export.");
            return;
        }

        // Header Kolom CSV
        let csvRows = [
            ["ID Pesanan", "Nama Penyewa", "Tanggal Mulai", "Tanggal Selesai", "Durasi (Hari)", "Daftar Barang", "Total Biaya (Rp)", "Status", "Tanggal Buat"]
        ];

        // Isikan Baris Data
        orderHistory.forEach(order => {
            const itemsText = order.items ? order.items.map(i => `${i.name} (x${i.quantity})`).join("; ") : "-";
            csvRows.push([
                `"#${order.orderId}"`,
                `"${order.customerName || 'Penyewa'}"`,
                `"${order.startDate}"`,
                `"${order.endDate}"`,
                order.days || 1,
                `"${itemsText}"`,
                order.total || 0,
                `"${order.status || 'pending'}"`,
                `"${order.createdAt || order.date || '-'}"`
            ]);
        });

        // Format menjadi string CSV dengan BOM untuk Excel
        const csvString = "\uFEFF" + csvRows.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = `Laporan_Transaksi_Lensaku_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast("Laporan transaksi berhasil diunduh!");
    });
});

function getTodayISO() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function loadAdminData() {
    let orderHistory = JSON.parse(localStorage.getItem("lensaku_history")) || [];

    // 1. Amankan status bawaan
    orderHistory = orderHistory.map(o => {
        if (!o.status) o.status = "pending";
        return o;
    });

    // 2. Hitung statistik keseluruhan
    const totalOrders = orderHistory.length;
    const pendingOrders = orderHistory.filter(o => o.status === "pending").length;
    const activeCount = orderHistory.filter(o => o.status === "active").length;
    const completedCount = orderHistory.filter(o => o.status === "completed").length;

    if (document.getElementById("totalOrdersCount")) document.getElementById("totalOrdersCount").textContent = totalOrders;
    if (document.getElementById("pendingOrdersCount")) document.getElementById("pendingOrdersCount").textContent = pendingOrders;
    if (document.getElementById("activeRentalsCount")) document.getElementById("activeRentalsCount").textContent = activeCount;
    if (document.getElementById("completedOrdersCount")) document.getElementById("completedOrdersCount").textContent = completedCount;

    // 3. Terapkan Filter & Pencarian
    const searchVal = document.getElementById("searchOrderInput")?.value.trim().toLowerCase() || "";
    const filterStatus = document.getElementById("filterStatusSelect")?.value || "all";

    const filteredOrders = orderHistory.filter(order => {
        const matchesSearch = String(order.orderId).toLowerCase().includes(searchVal) ||
                              (order.customerName && order.customerName.toLowerCase().includes(searchVal));
        const matchesStatus = filterStatus === "all" || order.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const container = document.getElementById("adminOrderList");
    if (!container) return;

    if (filteredOrders.length === 0) {
        container.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--muted); font-size: 13px;">Pesanan tidak ditemukan.</div>`;
        return;
    }

    const todayISO = getTodayISO();

    // 4. Render hasil yang sudah difilter
    container.innerHTML = filteredOrders.map((order) => {
        const status = order.status || "pending";
        
        let badgeHtml = '';
        let actionHtml = '';
        let lateInfoHtml = '';

        if (status === "pending") {
            badgeHtml = '<span style="font-size: 10px; padding: 4px 10px; border-radius: 6px; font-weight: 800; background: rgba(249,115,22,0.15); color: #f97316;">MENUNGGU KONFIRMASI</span>';
            actionHtml = `
                <div style="display: flex; gap: 8px; width: 100%;">
                    <button class="btn btn-primary" onclick="acceptOrder(${order.orderId})" style="font-size: 11px; padding: 8px 12px; flex: 1; background: #22c55e; border-color: #22c55e;">Terima</button>
                    <button class="btn btn-outline" onclick="rejectOrder(${order.orderId})" style="font-size: 11px; padding: 8px 12px; flex: 1; color: #ff7777; border-color: rgba(255,119,119,0.3);">Tolak</button>
                </div>
            `;
        } else if (status === "active") {
            const isOverdue = order.endDate < todayISO;

            if (isOverdue) {
                const endDateObj = new Date(`${order.endDate}T00:00:00Z`);
                const todayObj = new Date(`${todayISO}T00:00:00Z`);
                const overdueDays = Math.round((todayObj - endDateObj) / 86400000);

                const dailyRate = (order.total / (order.days || 1));
                const penaltyAmount = dailyRate * overdueDays;

                badgeHtml = `<span style="font-size: 10px; padding: 4px 10px; border-radius: 6px; font-weight: 800; background: rgba(239,68,68,0.2); color: #ef4444; border: 1px solid rgba(239,68,68,0.4);">TERLAMBAT ${overdueDays} HARI</span>`;
                lateInfoHtml = `
                    <div style="font-size: 11px; color: #ef4444; font-weight: bold; background: rgba(239,68,68,0.1); padding: 6px 10px; border-radius: 6px; margin-top: 4px;">
                        Denda Keterlambatan: ${rupiah(penaltyAmount)} (${overdueDays} hr × ${rupiah(dailyRate)}/hr)
                    </div>
                `;
            } else {
                badgeHtml = '<span style="font-size: 10px; padding: 4px 10px; border-radius: 6px; font-weight: 800; background: rgba(37,99,235,0.15); color: #2563eb;">SEDANG DISEWA</span>';
            }

            actionHtml = `
                <div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
                    <button class="btn btn-primary" onclick="forceReturnOrder(${order.orderId})" style="font-size: 11px; padding: 8px 12px; width: 100%; justify-content: center;">
                        Selesaikan & Kembalikan
                    </button>
                    <button class="btn btn-outline" onclick="printInvoice(${order.orderId})" style="font-size: 11px; padding: 8px 12px; width: 100%; justify-content: center; color: #38bdf8; border-color: rgba(56,189,248,0.3);">
                        Cetak Nota
                    </button>
                </div>
            `;
        } else if (status === "completed") {
            badgeHtml = '<span style="font-size: 10px; padding: 4px 10px; border-radius: 6px; font-weight: 800; background: rgba(74,222,128,0.15); color: #4ade80;">SELESAI</span>';
            actionHtml = `
                <div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
                    <div style="font-size: 11px; color: var(--muted); text-align: center; margin-bottom: 2px;">Penyewaan Selesai</div>
                    <button class="btn btn-outline" onclick="printInvoice(${order.orderId})" style="font-size: 11px; padding: 8px 12px; width: 100%; justify-content: center; color: #38bdf8; border-color: rgba(56,189,248,0.3);">
                        Cetak Nota
                    </button>
                </div>
            `;
        } else if (status === "rejected") {
            badgeHtml = '<span style="font-size: 10px; padding: 4px 10px; border-radius: 6px; font-weight: 800; background: rgba(239,68,68,0.15); color: #ef4444;">DITOLAK</span>';
            actionHtml = `<div style="font-size: 11px; color: #ef4444; text-align: center;">Pesanan Ditolak</div>`;
        }

        return `
            <div style="padding: 20px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface-2); display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 280px; display: flex; flex-direction: column; gap: 8px;">
                    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                        <strong style="font-size: 15px; color: var(--text); font-family: 'Outfit', sans-serif;">Pesanan #${order.orderId} (${escapeHtml(order.customerName || 'Penyewa')})</strong>
                        ${badgeHtml}
                    </div>
                    <div style="font-size: 11px; color: var(--muted);">
                        Periode Sewa: <span style="color: var(--text); font-weight: 500;">${order.startDate} s/d ${order.endDate}</span> (${order.days} Hari)
                    </div>
                    <div style="font-size: 11px; color: #ddd;">
                        <span style="color: var(--muted);">Barang:</span> ${order.items.map(i => `${i.name} ×${i.quantity}`).join(", ")}
                    </div>
                    <div style="font-size: 12px; font-weight: bold; color: var(--orange);">
                        Total Sewa: ${rupiah(order.total)}
                    </div>
                    ${lateInfoHtml}
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px; justify-content: center; min-width: 180px;">
                    ${actionHtml}
                </div>
            </div>
        `;
    }).join("");
}

function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
}

window.acceptOrder = function(orderId) {
    let orderHistory = JSON.parse(localStorage.getItem("lensaku_history")) || [];
    let activeRentals = JSON.parse(localStorage.getItem("lensaku_active_rentals")) || [];
    let products = JSON.parse(localStorage.getItem("lensaku_products")) || [];

    const targetOrder = orderHistory.find(o => o.orderId === orderId);
    if (!targetOrder) return;

    let isStockSufficient = true;
    for (const item of targetOrder.items) {
        const prod = products.find(p => p.id === item.id);
        if (!prod || prod.stock < item.quantity) {
            isStockSufficient = false;
            break;
        }
    }

    if (!isStockSufficient) {
        showToast("Gagal: Stok tidak mencukupi untuk pesanan ini!");
        return;
    }

    targetOrder.items.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        if (prod) prod.stock -= item.quantity;
    });

    targetOrder.status = "active";
    activeRentals.push(targetOrder);

    localStorage.setItem("lensaku_history", JSON.stringify(orderHistory));
    localStorage.setItem("lensaku_active_rentals", JSON.stringify(activeRentals));
    localStorage.setItem("lensaku_products", JSON.stringify(products));

    loadAdminData();
    showToast("Pesanan diterima & stok dikurangi.");
};

window.rejectOrder = function(orderId) {
    let orderHistory = JSON.parse(localStorage.getItem("lensaku_history")) || [];
    const targetOrder = orderHistory.find(o => o.orderId === orderId);
    if (!targetOrder) return;

    targetOrder.status = "rejected";
    localStorage.setItem("lensaku_history", JSON.stringify(orderHistory));
    loadAdminData();
    showToast("Pesanan ditolak.");
};

document.getElementById("clearHistoryBtn")?.addEventListener("click", () => {
    if (confirm("Peringatan: Yakin ingin menghapus seluruh riwayat transaksi? (Stok dari pesanan aktif akan dikembalikan)")) {
        let activeRentals = JSON.parse(localStorage.getItem("lensaku_active_rentals")) || [];
        let products = JSON.parse(localStorage.getItem("lensaku_products")) || [];

        activeRentals.forEach(rental => {
            rental.items.forEach(item => {
                const prod = products.find(p => p.id === item.id);
                if (prod) prod.stock += item.quantity;
            });
        });

        localStorage.setItem("lensaku_products", JSON.stringify(products));
        localStorage.removeItem("lensaku_history");
        localStorage.removeItem("lensaku_active_rentals");
        
        showToast("Riwayat dibersihkan & stok dikembalikan.");
        loadAdminData();
    }
});

// Fungsi untuk membuka jendela cetak Nota / Invoice PDF
window.printInvoice = function(orderId) {
    const orderHistory = JSON.parse(localStorage.getItem("lensaku_history")) || [];
    const order = orderHistory.find(o => o.orderId === orderId);

    if (!order) {
        showToast("Data pesanan tidak ditemukan.");
        return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
        showToast("Pop-up terblokir! Izinkan pop-up di browser Anda.");
        return;
    }

    const itemsHtml = order.items.map((item, index) => `
        <tr>
            <td style="text-align: center; border-bottom: 1px solid #e2e8f0; padding: 12px 8px;">${index + 1}</td>
            <td style="border-bottom: 1px solid #e2e8f0; padding: 12px 8px;">
                <strong style="color: #0f172a;">${item.name}</strong>
            </td>
            <td style="text-align: center; border-bottom: 1px solid #e2e8f0; padding: 12px 8px;">${item.quantity}</td>
            <td style="text-align: right; border-bottom: 1px solid #e2e8f0; padding: 12px 8px;">${rupiah(item.price)}</td>
            <td style="text-align: right; border-bottom: 1px solid #e2e8f0; padding: 12px 8px; font-weight: 600; color: #0f172a;">
                ${rupiah(item.price * item.quantity * order.days)}
            </td>
        </tr>
    `).join("");

    const statusLabel = (order.status || "active").toUpperCase();
    const formattedDate = order.createdAt || order.date || new Date().toLocaleDateString("id-ID");

    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <title>Invoice #${order.orderId} - Lensaku Studio</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    color: #334155;
                    background: #f8fafc;
                    padding: 40px 20px;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                .invoice-card {
                    max-width: 800px;
                    margin: 0 auto;
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 48px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
                }
                .invoice-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    border-bottom: 2px solid #0f172a;
                    padding-bottom: 24px;
                    margin-bottom: 32px;
                }
                .brand-title {
                    font-size: 28px;
                    font-weight: 800;
                    color: #0f172a;
                    letter-spacing: -0.5px;
                }
                .brand-title span { color: #2563eb; }
                .brand-sub {
                    font-size: 11px;
                    color: #64748b;
                    margin-top: 4px;
                    line-height: 1.5;
                }
                .doc-type {
                    text-align: right;
                }
                .doc-title {
                    font-size: 22px;
                    font-weight: 700;
                    color: #0f172a;
                    letter-spacing: 1px;
                }
                .doc-number {
                    font-size: 13px;
                    color: #64748b;
                    font-weight: 600;
                    margin-top: 4px;
                }
                .status-badge {
                    display: inline-block;
                    margin-top: 8px;
                    padding: 4px 12px;
                    border-radius: 50px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    background: #eff6ff;
                    color: #2563eb;
                    border: 1px solid #bfdbfe;
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 32px;
                    margin-bottom: 36px;
                }
                .info-block h4 {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #94a3b8;
                    margin-bottom: 8px;
                    font-weight: 700;
                }
                .info-block p {
                    font-size: 13px;
                    color: #1e293b;
                    line-height: 1.6;
                }
                .items-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 32px;
                    font-size: 13px;
                }
                .items-table th {
                    background: #f1f5f9;
                    color: #475569;
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 11px;
                    letter-spacing: 0.5px;
                    padding: 12px 8px;
                    border-top: 1px solid #e2e8f0;
                    border-bottom: 2px solid #cbd5e1;
                }
                .summary-section {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 40px;
                }
                .summary-table {
                    width: 320px;
                    font-size: 13px;
                }
                .summary-table td {
                    padding: 8px 0;
                    color: #64748b;
                }
                .summary-table td.val {
                    text-align: right;
                    color: #1e293b;
                    font-weight: 600;
                }
                .grand-total-row td {
                    border-top: 2px solid #0f172a;
                    padding-top: 12px !important;
                    font-size: 16px;
                    font-weight: 700;
                    color: #0f172a !important;
                }
                .grand-total-row .val {
                    color: #2563eb !important;
                    font-size: 18px;
                }
                .footer-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 32px;
                    border-top: 1px solid #e2e8f0;
                    padding-top: 28px;
                    font-size: 11px;
                }
                .terms-box h5 {
                    font-size: 11px;
                    color: #0f172a;
                    margin-bottom: 6px;
                    text-transform: uppercase;
                }
                .terms-box ul {
                    padding-left: 14px;
                    color: #64748b;
                    line-height: 1.6;
                }
                .signature-box {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .signature-space {
                    height: 60px;
                }
                .signature-name {
                    font-weight: 700;
                    color: #0f172a;
                    text-decoration: underline;
                }

                @media print {
                    body { background: #ffffff; padding: 0; }
                    .invoice-card { border: none; box-shadow: none; padding: 0; width: 100%; max-width: 100%; }
                }
            </style>
        </head>
        <body>
            <div class="invoice-card">
                <div class="invoice-header">
                    <div>
                        <div class="brand-title">lensaku<span>.</span></div>
                        <div class="brand-sub">
                            Penyewaan Kamera & Alat Sinematografi<br>
                            Layanan Resmi & Garansi Alat Siap Pakai
                        </div>
                    </div>
                    <div class="doc-type">
                        <div class="doc-title">NOTA SEWA</div>
                        <div class="doc-number">#${order.orderId}</div>
                        <div class="status-badge">${statusLabel}</div>
                    </div>
                </div>

                <div class="info-grid">
                    <div class="info-block">
                        <h4>Diberikan Kepada:</h4>
                        <p>
                            <strong style="font-size: 15px; color: #0f172a;">${order.customerName || 'Penyewa Umum'}</strong><br>
                            Tanggal Transaksi: ${formattedDate}
                        </p>
                    </div>
                    <div class="info-block" style="text-align: right;">
                        <h4>Detail Jadwal Sewa:</h4>
                        <p>
                            Mulai: <strong>${order.startDate}</strong><br>
                            Selesai: <strong>${order.endDate}</strong><br>
                            Durasi Terhitung: <strong>${order.days} Hari</strong>
                        </p>
                    </div>
                </div>

                <table class="items-table">
                    <thead>
                        <tr>
                            <th style="width: 40px; text-align: center;">No</th>
                            <th>Deskripsi Peralatan</th>
                            <th style="width: 60px; text-align: center;">Qty</th>
                            <th style="width: 130px; text-align: right;">Tarif / Hari</th>
                            <th style="width: 140px; text-align: right;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>

                <div class="summary-section">
                    <table class="summary-table">
                        <tr>
                            <td>Durasi Sewa</td>
                            <td class="val">${order.days} Hari</td>
                        </tr>
                        <tr class="grand-total-row">
                            <td>TOTAL BIAYA SEWA</td>
                            <td class="val">${rupiah(order.total)}</td>
                        </tr>
                    </table>
                </div>

                <div class="footer-grid">
                    <div class="terms-box">
                        <h5>Ketentuan Pengembalian:</h5>
                        <ul>
                            <li>Wajib menyerahkan kartu identitas asli (KTP/SIM) yang sesuai.</li>
                            <li>Keterlambatan pengembalian unit dikenakan tarif sewa harian berjalan.</li>
                            <li>Segala bentuk kerusakan alat menjadi tanggung jawab penuh pihak penyewa.</li>
                        </ul>
                    </div>
                    <div class="signature-box">
                        <span style="color: #64748b;">Hormat Kami,</span>
                        <div class="signature-space"></div>
                        <div>
                            <div class="signature-name">Pengelola Lensaku</div>
                            <span style="color: #94a3b8; font-size: 10px;">Stempel / Tanda Tangan Resmi</span>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                window.onload = function() {
                    window.print();
                };
            </script>
        </body>
        </html>
    `);

    printWindow.document.close();
};

window.forceReturnOrder = function(orderId) {
    let orderHistory = JSON.parse(localStorage.getItem("lensaku_history")) || [];
    let activeRentals = JSON.parse(localStorage.getItem("lensaku_active_rentals")) || [];
    let products = JSON.parse(localStorage.getItem("lensaku_products")) || [];

    const targetOrder = orderHistory.find(o => o.orderId === orderId);

    if (!targetOrder) {
        showToast("Data pesanan tidak ditemukan.");
        return;
    }

    if (targetOrder.status === "completed") {
        showToast("Pesanan ini sudah diselesaikan sebelumnya.");
        return;
    }

    targetOrder.items.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        if (prod) {
            prod.stock += item.quantity;
        }
    });

    targetOrder.status = "completed";

    activeRentals = activeRentals.filter(r => r.orderId !== orderId);

    localStorage.setItem("lensaku_history", JSON.stringify(orderHistory));
    localStorage.setItem("lensaku_active_rentals", JSON.stringify(activeRentals));
    localStorage.setItem("lensaku_products", JSON.stringify(products));

    showToast(`Pesanan #${orderId} selesai. Stok kembali utuh & data tersimpan di riwayat.`);
    
    loadAdminData();
};
