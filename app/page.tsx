'use client'
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        // Ambil CSRF cookie dari Laravel Sanctum
        const response = await fetch("http://localhost:8000/sanctum/csrf-cookie", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Gagal mengambil CSRF cookie");
        }
        console.log("CSRF cookie berhasil diambil");
      } catch (error) {
        console.error("Gagal mengambil CSRF cookie:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      Cookies.set("token", response.data.token);

      setMessage("Login berhasil");
      router.push("/reimbursement");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          "Login gagal: " +
            (error.response?.data.message || "Terjadi kesalahan")
        );
      } else {
        setMessage("Terjadi kesalahan pada sistem");
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Selamat Datang
        </h1>

        <form
          action="#"
          onSubmit={handleLogin}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          {message && <p className="text-center">{message}</p>}
          <p className="text-center text-lg font-medium">Masukkan Akun Anda</p>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Masukkan email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Masukkan password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500">
            Belum punya akun?
            <a className="underline" href="register">
              Daftar
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
