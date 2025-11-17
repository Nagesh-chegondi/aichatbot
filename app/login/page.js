"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Login failed");
      } else {
        router.push("/home"); // redirect after success
      }
    } catch (error) {
      setErrorMsg("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEF2FF] to-white flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl p-8">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h1>
        <p className="text-gray-500 text-sm mb-6">Sign in to continue</p>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {errorMsg && (
            <p className="text-red-600 text-sm font-medium">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg px-4 py-3 text-white font-medium transition ${
              loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-sm text-gray-600 flex justify-between">
          <a href="#" className="hover:text-indigo-600">Forgot password?</a>
          <a href="/" className="hover:text-indigo-600">Create account</a>
        </div>
      </div>
    </div>
  );
}
