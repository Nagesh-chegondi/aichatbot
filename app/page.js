"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router =useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function signup(e) {
    e.preventDefault();
    console.log("Form Submitted:", form);
    const res = await fetch("/api/signup",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(form)
    })
     const data = await res.json()
    
      if (!res.ok) {
        setErrorMsg(data.message || "signup failed");
      } else {
        router.push("/login"); // redirect after success
      }
    // TODO: API call
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 text-gray-900 px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SECTION */}
        <div className="relative space-y-5">
          <h1 className="text-5xl font-black tracking-tight">
            Create your <span className="text-blue-600">AI Workspace</span>
          </h1>
          <p className="text-gray-600 leading-relaxed text-lg">
            Unlock powerful AI tools, chat deeply, analyze data and boost productivity — all in one place.
          </p>

          <div className="flex gap-3 mt-4 text-gray-500">
            <span className="text-sm border px-3 py-1 rounded-full">Fast</span>
            <span className="text-sm border px-3 py-1 rounded-full">Secure</span>
            <span className="text-sm border px-3 py-1 rounded-full">AI-Powered</span>
          </div>
        </div>

        {/* RIGHT SECTION - FORM */}
        <div className="bg-white/70 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Create your account</h2>

          <form onSubmit={signup} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
