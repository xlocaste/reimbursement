"use client"
import { useEffect } from "react";

const Component = () => {
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        // Ambil CSRF cookie dari endpoint Sanctum
        const response = await fetch("http://localhost:8000/sanctum/csrf-cookie", {
          credentials: "include", // Ini penting agar cookie diterima di browser
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil CSRF cookie");
        }

        console.log("CSRF cookie berhasil diambil");
      } catch (error) {
        console.error("Gagal mengambil CSRF cookie:", error);
      }
    };

    // Panggil fungsi untuk fetch CSRF cookie
    fetchCsrfToken();
  }, []);

  return <div>CSRF Token Component</div>;
};

export default Component;
