"use strict";

if (sessionStorage.getItem("lensaku_logged") !== "yes") {
    window.location.href = "admin.html";
}

const toastElement = document.getElementById("toast");

function showToast(message) {
    if (!toastElement) return;
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

function getProductsFromStorage() {
    let products = JSON.parse(localStorage.getItem("lensaku_products"));
    return products || [];
}

function loadAdminProducts() {
    const products = getProductsFromStorage();
    const container = document.getElementById("adminProductList");
    if (!container) return;

    const searchVal = document.getElementById("searchAdminProd")?.value.trim().toLowerCase() || "";
    const catVal = document.getElementById("filterAdminCategory")?.value || "all";

    const filteredProducts = products.filter(p => {
        const matchesSearch = (p.name || "").toLowerCase().includes(searchVal) || 
                              (p.brand || "").toLowerCase().includes(searchVal);
        const matchesCategory = catVal === "all" || p.category === catVal;
        return matchesSearch && matchesCategory;
    });

    if (filteredProducts.length === 0) {
        container.innerHTML = `<div style="text-align: center; padding: 30px; color: var(--muted); font-size: 12px;">Produk tidak ditemukan.</div>`;
        return;
    }

    container.innerHTML = filteredProducts.map(prod => `
        <div style="padding: 16px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface-2); display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <img src="${prod.image}" alt="${prod.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
                <div>
                    <strong style="font-size: 14px; color: var(--text); display: block; margin-bottom: 2px;">${prod.name}</strong>
                    <span style="font-size: 11px; color: var(--muted);">Kategori: ${prod.category} • Stok: <strong style="color: var(--orange);">${prod.stock} unit</strong></span>
                </div>
            </div>

            <div style="display: flex; align-items: center; gap: 20px;">
                <div style="text-align: right;">
                    <span style="font-size: 12px; font-weight: bold; color: var(--orange); display: block;">${rupiah(prod.price)} / hari</span>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-outline" onclick="openEditProduct(${prod.id})" style="font-size: 11px; padding: 6px 12px;">Edit</button>
                    <button class="btn btn-outline" onclick="deleteProduct(${prod.id})" style="font-size: 11px; padding: 6px 12px; color: #ff7777; border-color: rgba(255,119,119,0.3);">Hapus</button>
                </div>
            </div>
        </div>
    `).join("");
}

const productModal = document.getElementById("productModal");
const productForm = document.getElementById("productForm");

document.getElementById("addNewProductBtn")?.addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = "Tambah Produk Baru";
    document.getElementById("editProductId").value = "";
    productForm.reset();
    productModal.style.display = "flex";
});

document.getElementById("cancelModalBtn")?.addEventListener("click", () => {
    productModal.style.display = "none";
});

window.openEditProduct = function(id) {
    const products = getProductsFromStorage();
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    document.getElementById("modalTitle").textContent = "Edit Produk";
    document.getElementById("editProductId").value = prod.id;
    document.getElementById("prodName").value = prod.name;
    document.getElementById("prodBrand").value = prod.brand || "";
    document.getElementById("prodCategory").value = prod.category || "";
    document.getElementById("prodPrice").value = prod.price;
    document.getElementById("prodStock").value = prod.stock;
    document.getElementById("prodImage").value = prod.image;
    document.getElementById("prodDesc").value = prod.description || "";

    productModal.style.display = "flex";
};

productForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = document.getElementById("editProductId").value;
    let products = getProductsFromStorage();

    const name = document.getElementById("prodName").value.trim();
    const brand = document.getElementById("prodBrand").value.trim();
    const category = document.getElementById("prodCategory").value.trim();
    const price = Number(document.getElementById("prodPrice").value);
    const stock = Number(document.getElementById("prodStock").value);
    const image = document.getElementById("prodImage").value.trim();
    const description = document.getElementById("prodDesc").value.trim();

    const defaultSpecs = [
        `Kondisi fisik: Mulus 98% (Siap pakai)`,
        `Kelengkapan: Unit ${name}, Aksesoris Standar`,
        `Garansi fungsi 1x24 jam setelah barang diterima`
    ];

    if (editId) {
        products = products.map(p => {
            if (p.id == editId) {
                return { 
                    ...p, 
                    name, 
                    brand, 
                    category, 
                    price, 
                    stock, 
                    image, 
                    description,
                    specs: p.specs || defaultSpecs
                };
            }
            return p;
        });
        showToast("Produk berhasil diperbarui!");
    } else {
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ 
            id: newId, 
            name, 
            brand, 
            category, 
            price, 
            stock, 
            image, 
            description,
            specs: defaultSpecs
        });
        showToast("Produk baru berhasil ditambahkan!");
    }

    localStorage.setItem("lensaku_products", JSON.stringify(products));
    productModal.style.display = "none";
    loadAdminProducts();
}); 

window.deleteProduct = function(id) {
    if (confirm("Yakin ingin menghapus produk ini dari etalase?")) {
        let products = getProductsFromStorage();
        products = products.filter(p => p.id !== id);
        localStorage.setItem("lensaku_products", JSON.stringify(products));
        showToast("Produk berhasil dihapus.");
        loadAdminProducts();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    getProductsFromStorage();
    loadAdminProducts();

    document.getElementById("searchAdminProd")?.addEventListener("input", loadAdminProducts);
    document.getElementById("filterAdminCategory")?.addEventListener("change", loadAdminProducts);

    document.getElementById("logoutBtn")?.addEventListener("click", () => {
        sessionStorage.removeItem("lensaku_logged");
        window.location.href = "admin.html";
    });
});
