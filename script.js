// =====================================================
// DATA
// =====================================================

let produk = JSON.parse(localStorage.getItem("kasir_produk")) || [
    {
        id: 1,
        nama: "Indomie Goreng",
        kategori: "Makanan",
        harga: 3500,
        stok: 20
    },
    {
        id: 2,
        nama: "Teh Botol",
        kategori: "Minuman",
        harga: 5000,
        stok: 15
    },
    {
        id: 3,
        nama: "Air Mineral",
        kategori: "Minuman",
        harga: 3000,
        stok: 25
    },
    {
        id: 4,
        nama: "Roti Coklat",
        kategori: "Makanan",
        harga: 7000,
        stok: 10
    },
    {
    id: 5,
    nama: "Mie Sedaap Goreng",
    kategori: "Makanan",
    harga: 3500,
    stok: 20
    },
    {
        id: 6,
        nama: "Biskuit",
        kategori: "Makanan",
        harga: 5000,
        stok: 18
    },
    {
        id: 7,
        nama: "Keripik Kentang",
        kategori: "Makanan",
        harga: 8000,
        stok: 12
    },
    {
        id: 8,
        nama: "Susu Kotak",
        kategori: "Minuman",
        harga: 6000,
        stok: 15
    },
    {
        id: 9,
        nama: "Kopi Botol",
        kategori: "Minuman",
        harga: 7000,
        stok: 10
    },
    {
        id: 10,
        nama: "Jus Mangga",
        kategori: "Minuman",
        harga: 8000,
        stok: 10
    },
    {
        id: 11,
        nama: "Wafer Coklat",
        kategori: "Makanan",
        harga: 4000,
        stok: 20
    },
    {
        id: 12,
        nama: "Air Teh",
        kategori: "Minuman",
        harga: 4000,
        stok: 25
    },
    {
    id: 13,
    nama: "Nasi Goreng Instan",
    kategori: "Makanan",
    harga: 9000,
    stok: 10
    },
    {
        id: 14,
        nama: "Sosis",
        kategori: "Makanan",
        harga: 7000,
        stok: 15
    },
    {
        id: 15,
        nama: "Donat",
        kategori: "Makanan",
        harga: 5000,
        stok: 12
    },
    {
        id: 16,
        nama: "Kacang Goreng",
        kategori: "Makanan",
        harga: 6000,
        stok: 20
    },
    {
        id: 17,
        nama: "Coklat Batang",
        kategori: "Makanan",
        harga: 8000,
        stok: 10
    },
    {
        id: 18,
        nama: "Air Kelapa",
        kategori: "Minuman",
        harga: 7000,
        stok: 15
    },
    {
        id: 19,
        nama: "Susu Coklat",
        kategori: "Minuman",
        harga: 6000,
        stok: 18
    },
    {
        id: 20,
        nama: "Teh Pucuk",
        kategori: "Minuman",
        harga: 4000,
        stok: 25
    },
    {
        id: 21,
        nama: "Jus Jeruk",
        kategori: "Minuman",
        harga: 8000,
        stok: 12
    },
    {
        id: 22,
        nama: "Minuman Soda",
        kategori: "Minuman",
        harga: 7000,
        stok: 15
    }
];

let transaksi = JSON.parse(localStorage.getItem("kasir_transaksi")) || [];

let keranjang = [];


// =====================================================
// FORMAT RUPIAH
// =====================================================

function rupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka || 0);
}


// =====================================================
// SIMPAN LOCAL STORAGE
// =====================================================

function simpanData() {
    localStorage.setItem("kasir_produk", JSON.stringify(produk));
    localStorage.setItem("kasir_transaksi", JSON.stringify(transaksi));
}


// =====================================================
// NAVIGASI
// =====================================================

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    document.getElementById(pageId).classList.add("active-page");

    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    event.target.classList.add("active");

    if (pageId === "dashboard") {
        updateDashboard();
    }

    if (pageId === "produk") {
        tampilkanProduk();
    }

    if (pageId === "kasir") {
        tampilkanProdukKasir();
    }

    if (pageId === "riwayat") {
        tampilkanRiwayat();
    }

    if (pageId === "laporan") {
        tampilkanLaporan();
    }
}


// =====================================================
// PRODUK
// =====================================================

function bukaFormProduk() {

    document.getElementById("formProduk").style.display = "block";

    document.getElementById("judulFormProduk").textContent =
        "Tambah Produk";

    document.getElementById("namaProduk").value = "";
    document.getElementById("kategoriProduk").value = "";
    document.getElementById("hargaProduk").value = "";
    document.getElementById("stokProduk").value = "";
    document.getElementById("editProdukId").value = "";
}


function tutupFormProduk() {
    document.getElementById("formProduk").style.display = "none";
}


function simpanProduk() {

    const nama = document.getElementById("namaProduk").value.trim();
    const kategori = document.getElementById("kategoriProduk").value.trim();
    const harga = Number(document.getElementById("hargaProduk").value);
    const stok = Number(document.getElementById("stokProduk").value);

    const editId = document.getElementById("editProdukId").value;


    if (!nama || !kategori || harga <= 0 || stok < 0) {
        alert("Silakan isi data produk dengan benar.");
        return;
    }


    // EDIT
    if (editId) {

        const index = produk.findIndex(
            item => item.id == editId
        );

        if (index !== -1) {

            produk[index].nama = nama;
            produk[index].kategori = kategori;
            produk[index].harga = harga;
            produk[index].stok = stok;
        }

    }

    // TAMBAH
    else {

        produk.push({
            id: Date.now(),
            nama: nama,
            kategori: kategori,
            harga: harga,
            stok: stok
        });

    }


    simpanData();
    tampilkanProduk();
    tampilkanProdukKasir();

    tutupFormProduk();

    alert("Produk berhasil disimpan.");
}


// =====================================================
// TAMPIL PRODUK
// =====================================================

function tampilkanProduk() {

    const tbody = document.getElementById("tabelProduk");

    const keyword =
        document.getElementById("cariProduk")?.value
        .toLowerCase() || "";

    const hasil = produk.filter(item =>
        item.nama.toLowerCase().includes(keyword)
    );


    tbody.innerHTML = "";


    hasil.forEach((item, index) => {

        tbody.innerHTML += `
            <tr>

                <td>${index + 1}</td>

                <td>${item.nama}</td>

                <td>${item.kategori}</td>

                <td>${rupiah(item.harga)}</td>

                <td>${item.stok}</td>

                <td>

                    <button
                        class="btn warning"
                        onclick="editProduk(${item.id})">
                        Edit
                    </button>

                    <button
                        class="btn danger"
                        onclick="hapusProduk(${item.id})">
                        Hapus
                    </button>

                </td>

            </tr>
        `;
    });


    if (hasil.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    Produk tidak ditemukan.
                </td>
            </tr>
        `;
    }
}


// =====================================================
// EDIT PRODUK
// =====================================================

function editProduk(id) {

    const item = produk.find(p => p.id === id);

    if (!item) return;


    document.getElementById("formProduk").style.display = "block";

    document.getElementById("judulFormProduk").textContent =
        "Edit Produk";

    document.getElementById("namaProduk").value = item.nama;

    document.getElementById("kategoriProduk").value =
        item.kategori;

    document.getElementById("hargaProduk").value =
        item.harga;

    document.getElementById("stokProduk").value =
        item.stok;

    document.getElementById("editProdukId").value =
        item.id;
}


// =====================================================
// HAPUS PRODUK
// =====================================================

function hapusProduk(id) {

    const digunakan = keranjang.some(
        item => item.id === id
    );

    if (digunakan) {
        alert("Produk sedang ada di keranjang.");
        return;
    }


    if (!confirm("Yakin ingin menghapus produk ini?")) {
        return;
    }


    produk = produk.filter(item => item.id !== id);

    simpanData();

    tampilkanProduk();
    tampilkanProdukKasir();
}


// =====================================================
// PRODUK KASIR
// =====================================================

function tampilkanProdukKasir() {

    const container =
        document.getElementById("produkKasir");

    const keyword =
        document.getElementById("cariKasir")?.value
        .toLowerCase() || "";


    const hasil = produk.filter(item =>
        item.nama.toLowerCase().includes(keyword)
    );


    container.innerHTML = "";


    hasil.forEach(item => {

        container.innerHTML += `
            <div class="produk-card">

                <h3>${item.nama}</h3>

                <p>${item.kategori}</p>

                <div class="harga">
                    ${rupiah(item.harga)}
                </div>

                <p>Stok: ${item.stok}</p>

                <button
                    class="btn primary"
                    onclick="tambahKeranjang(${item.id})"
                    ${item.stok <= 0 ? "disabled" : ""}>

                    ${item.stok <= 0 ? "Stok Habis" : "Tambah"}

                </button>

            </div>
        `;
    });
}


// =====================================================
// TAMBAH KERANJANG
// =====================================================

function tambahKeranjang(id) {

    const item = produk.find(p => p.id === id);

    if (!item || item.stok <= 0) {
        alert("Stok produk habis.");
        return;
    }


    const ada = keranjang.find(
        p => p.id === id
    );


    if (ada) {

        if (ada.qty >= item.stok) {
            alert("Jumlah melebihi stok.");
            return;
        }

        ada.qty++;

    } else {

        keranjang.push({
            id: item.id,
            nama: item.nama,
            harga: item.harga,
            qty: 1
        });

    }


    tampilkanKeranjang();
}


// =====================================================
// TAMPIL KERANJANG
// =====================================================

function tampilkanKeranjang() {

    const container =
        document.getElementById("keranjangList");

    container.innerHTML = "";


    if (keranjang.length === 0) {

        container.innerHTML = `
            <p class="kosong">
                Keranjang masih kosong.
            </p>
        `;

        hitungTotal();
        return;
    }


    keranjang.forEach(item => {

        container.innerHTML += `
            <div class="cart-item">

                <div class="cart-info">

                    <strong>${item.nama}</strong>

                    <small>
                        ${rupiah(item.harga)}
                    </small>

                </div>


                <div class="qty">

                    <button
                        onclick="ubahQty(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.qty}</span>

                    <button
                        onclick="ubahQty(${item.id}, 1)">
                        +
                    </button>

                </div>


                <div class="cart-price">
                    ${rupiah(item.harga * item.qty)}
                </div>


                <button
                    class="btn danger"
                    style="margin-left:10px;"
                    onclick="hapusKeranjang(${item.id})">
                    ×
                </button>

            </div>
        `;
    });


    hitungTotal();
}


// =====================================================
// UBAH QTY
// =====================================================

function ubahQty(id, perubahan) {

    const cart = keranjang.find(
        item => item.id === id
    );

    const product = produk.find(
        item => item.id === id
    );

    if (!cart || !product) return;


    const jumlahBaru =
        cart.qty + perubahan;


    if (jumlahBaru <= 0) {

        hapusKeranjang(id);
        return;
    }


    if (jumlahBaru > product.stok) {

        alert("Jumlah melebihi stok.");
        return;
    }


    cart.qty = jumlahBaru;

    tampilkanKeranjang();
}


// =====================================================
// HAPUS KERANJANG
// =====================================================

function hapusKeranjang(id) {

    keranjang = keranjang.filter(
        item => item.id !== id
    );

    tampilkanKeranjang();
}


// =====================================================
// HITUNG TOTAL
// =====================================================

function hitungTotal() {

    let subtotal = 0;


    keranjang.forEach(item => {

        subtotal += item.harga * item.qty;

    });


    const diskon =
        Number(document.getElementById("diskon").value) || 0;

    const pajakPersen =
        Number(document.getElementById("pajak").value) || 0;


    const setelahDiskon =
        Math.max(0, subtotal - diskon);


    const pajak =
        setelahDiskon * pajakPersen / 100;


    const total =
        setelahDiskon + pajak;


    document.getElementById("subtotal").textContent =
        rupiah(subtotal);

    document.getElementById("total").textContent =
        rupiah(total);


    hitungKembalian();


    return {
        subtotal,
        diskon,
        pajak,
        total
    };
}


// =====================================================
// KEMBALIAN
// =====================================================

function hitungKembalian() {

    const hasil = hitungTotalTanpaKembalian();

    const bayar =
        Number(document.getElementById("uangBayar").value) || 0;


    const kembali =
        Math.max(0, bayar - hasil.total);


    document.getElementById("kembalian").textContent =
        rupiah(kembali);
}


function hitungTotalTanpaKembalian() {

    let subtotal = 0;


    keranjang.forEach(item => {

        subtotal += item.harga * item.qty;

    });


    const diskon =
        Number(document.getElementById("diskon").value) || 0;

    const pajakPersen =
        Number(document.getElementById("pajak").value) || 0;


    const setelahDiskon =
        Math.max(0, subtotal - diskon);


    const pajak =
        setelahDiskon * pajakPersen / 100;


    const total =
        setelahDiskon + pajak;


    return {
        subtotal,
        diskon,
        pajak,
        total
    };
}


// =====================================================
// SIMPAN TRANSAKSI
// =====================================================

function simpanTransaksi(cetak = false) {

    if (keranjang.length === 0) {

        alert("Keranjang masih kosong.");
        return;
    }


    const hasil = hitungTotalTanpaKembalian();


    const bayar =
        Number(document.getElementById("uangBayar").value) || 0;


    if (bayar < hasil.total) {

        alert("Uang pembayaran belum cukup.");
        return;
    }


    // CEK STOK LAGI
    for (const item of keranjang) {

        const product =
            produk.find(p => p.id === item.id);

        if (!product || item.qty > product.stok) {

            alert(`Stok ${item.nama} tidak cukup.`);
            return;
        }
    }


    const idTransaksi =
        "TRX-" + Date.now();


    const dataTransaksi = {

        id: idTransaksi,

        tanggal: new Date().toLocaleString("id-ID"),

        items: JSON.parse(JSON.stringify(keranjang)),

        subtotal: hasil.subtotal,

        diskon: hasil.diskon,

        pajak: hasil.pajak,

        total: hasil.total,

        bayar: bayar,

        kembalian: bayar - hasil.total

    };


    // KURANGI STOK
    keranjang.forEach(item => {

        const product =
            produk.find(p => p.id === item.id);

        product.stok -= item.qty;

    });


    transaksi.unshift(dataTransaksi);

    simpanData();


    // CETAK
    if (cetak) {

        isiStruk(dataTransaksi);

        setTimeout(() => {
            window.print();
        }, 200);

    }


    alert("Transaksi berhasil disimpan.");


    resetTransaksi(false);

    updateDashboard();
    tampilkanProduk();
    tampilkanProdukKasir();
    tampilkanRiwayat();
    tampilkanLaporan();
}


// =====================================================
// RESET
// =====================================================

function resetTransaksi(tanya = true) {

    if (
        tanya &&
        keranjang.length > 0 &&
        !confirm("Reset transaksi sekarang?")
    ) {
        return;
    }


    keranjang = [];


    document.getElementById("diskon").value = 0;

    document.getElementById("pajak").value = 0;

    document.getElementById("uangBayar").value = "";


    tampilkanKeranjang();
}


// =====================================================
// STRUK
// =====================================================

function isiStruk(data) {

    document.getElementById("strukId").textContent =
        "ID: " + data.id;

    document.getElementById("strukTanggal").textContent =
        "Tanggal: " + data.tanggal;


    let html = "";


    data.items.forEach(item => {

        html += `
            <div class="struk-item">
                <span>
                    ${item.nama} x${item.qty}
                </span>

                <span>
                    ${rupiah(item.harga * item.qty)}
                </span>
            </div>
        `;
    });


    document.getElementById("strukItems").innerHTML =
        html;


    document.getElementById("strukSubtotal").textContent =
        rupiah(data.subtotal);

    document.getElementById("strukDiskon").textContent =
        rupiah(data.diskon);

    document.getElementById("strukPajak").textContent =
        rupiah(data.pajak);

    document.getElementById("strukTotal").textContent =
        rupiah(data.total);

    document.getElementById("strukBayar").textContent =
        rupiah(data.bayar);

    document.getElementById("strukKembalian").textContent =
        rupiah(data.kembalian);
}


// =====================================================
// RIWAYAT
// =====================================================

function tampilkanRiwayat() {

    const tbody =
        document.getElementById("tabelRiwayat");

    tbody.innerHTML = "";


    transaksi.forEach(data => {

        const jumlahItem =
            data.items.reduce(
                (total, item) => total + item.qty,
                0
            );


        tbody.innerHTML += `
            <tr>

                <td>${data.id}</td>

                <td>${data.tanggal}</td>

                <td>${jumlahItem}</td>

                <td>${rupiah(data.total)}</td>

                <td>

                    <button
                        class="btn primary"
                        onclick="cetakUlang('${data.id}')">
                        Cetak
                    </button>

                </td>

            </tr>
        `;
    });


    if (transaksi.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    Belum ada transaksi.
                </td>
            </tr>
        `;
    }
}


// =====================================================
// CETAK ULANG
// =====================================================

function cetakUlang(id) {

    const data =
        transaksi.find(item => item.id === id);

    if (!data) return;


    isiStruk(data);

    window.print();
}


// =====================================================
// DASHBOARD
// =====================================================

function updateDashboard() {

    document.getElementById("totalProduk").textContent =
        produk.length;


    document.getElementById("totalTransaksi").textContent =
        transaksi.length;


    const hariIni =
        new Date().toLocaleDateString("id-ID");


    const transaksiHariIni =
        transaksi.filter(item =>
            item.tanggal.startsWith(hariIni)
        );


    const penjualan =
        transaksiHariIni.reduce(
            (total, item) => total + item.total,
            0
        );


    document.getElementById("penjualanHariIni").textContent =
        rupiah(penjualan);


    const stokMenipis =
        produk.filter(item => item.stok <= 5).length;


    document.getElementById("stokMenipis").textContent =
        stokMenipis;


    const tbody =
        document.getElementById("dashboardTransaksi");

    tbody.innerHTML = "";


    transaksi.slice(0, 5).forEach(item => {

        tbody.innerHTML += `
            <tr>

                <td>${item.id}</td>

                <td>${item.tanggal}</td>

                <td>${rupiah(item.total)}</td>

            </tr>
        `;
    });


    if (transaksi.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;">
                    Belum ada transaksi.
                </td>
            </tr>
        `;
    }
}


// =====================================================
// LAPORAN
// =====================================================

function tampilkanLaporan() {

    const tbody =
        document.getElementById("tabelLaporan");

    tbody.innerHTML = "";


    let totalPendapatan = 0;

    let totalProdukTerjual = 0;


    transaksi.forEach(data => {

        totalPendapatan += data.total;


        data.items.forEach(item => {

            totalProdukTerjual += item.qty;

        });


        tbody.innerHTML += `
            <tr>

                <td>${data.id}</td>

                <td>${data.tanggal}</td>

                <td>${rupiah(data.total)}</td>

            </tr>
        `;
    });


    document.getElementById("laporanTransaksi").textContent =
        transaksi.length;


    document.getElementById("laporanPendapatan").textContent =
        rupiah(totalPendapatan);


    document.getElementById("laporanProdukTerjual").textContent =
        totalProdukTerjual;


    if (transaksi.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;">
                    Belum ada data penjualan.
                </td>
            </tr>
        `;
    }
}


// =====================================================
// JALANKAN SAAT WEBSITE DIBUKA
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    tampilkanProduk();

    tampilkanProdukKasir();

    tampilkanKeranjang();

    tampilkanRiwayat();

    tampilkanLaporan();

    updateDashboard();

});