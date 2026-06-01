document.addEventListener("DOMContentLoaded", () => {
    const phoneContainer = document.querySelector(".phone-container");

    // LENGKAP: Logika Pembuat Efek Ledakan Piksel Saat Diklik
    if (phoneContainer) {
        phoneContainer.addEventListener("click", (e) => {
            // 1. Hitung posisi klik mouse/posisi ketukan jari relatif terhadap frame HP
            const rect = phoneContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 2. Jalankan fungsi ledakan piksel di koordinat tersebut
            createPixelBurst(x, y);
        });
    }

    function createPixelBurst(x, y) {
        // Buat elemen container efek baru
        const effectContainer = document.createElement("div");
        effectContainer.className = "pixel-click-effect";
        effectContainer.style.left = `${x}px`;
        effectContainer.style.top = `${y}px`;

        // Jumlah partikel kotak yang mau dikeluarkan sekali meledak
        const particleCount = 8;
        
        // Mengambil variasi warna tema retro yang ada di CSS kamu
        const retroColors = ['#ff5e97', '#fcd116', '#0f4c81', '#a855f7', '#14b8a6', '#ffffff'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "pixel-particle";
            
            // Pilih warna acak dari palet retro biar meriah
            const randomColor = retroColors[Math.floor(Math.random() * retroColors.length)];
            particle.style.backgroundColor = randomColor;

            // Hitung sudut matematika & jarak pentalan secara acak (360 derajat)
            const angle = (i / particleCount) * 2 * Math.PI + (Math.random() * 0.4);
            const distance = 25 + Math.random() * 35; // Jarak pentalan piksel dalam satuan pixel
            
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;

            // Oper nilai hitungan ke dalam variabel CSS (--x & --y) agar dieksekusi animasi
            particle.style.setProperty('--x', `${targetX}px`);
            particle.style.setProperty('--y', `${targetY}px`);

            effectContainer.appendChild(particle);
        }

        // Masukkan efek ke dalam halaman web
        phoneContainer.appendChild(effectContainer);

        // Hapus elemen dari memori setelah 400ms (saat animasi selesai) agar HP tidak lemot/lag
        setTimeout(() => {
            effectContainer.remove();
        }, 400);
    }

    // Logika pencatatan klik tombol project di konsol (Tetap dipertahankan)
    const projectLinks = document.querySelectorAll(".project-list .retro-btn");
    projectLinks.forEach(link => {
        link.addEventListener("click", () => {
            console.log(`Membuka link eksternal: ${link.innerText}`);
        });
    });
});