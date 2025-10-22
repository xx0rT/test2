"use client";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        router.push('/admin/dashboard');
      }
    } catch (error: any) {
      setError(error.message || 'Přihlášení se nezdařilo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center padding-x">
      <div className="w-full max-w-[500px] bg-white rounded-[20px] p-[50px] shadow-2xl">
        <div className="flex flex-col items-center mb-[40px]">
          <Link href="/">
            <h1 className="text-[40px] font-FoundersGrotesk font-semibold text-secondry mb-[10px]">
              VILA ADALBERT
            </h1>
          </Link>
          <p className="paragraph font-NeueMontreal text-gray-600">
            Administrace
          </p>
        </div>

        {error && (
          <div className="w-full bg-red-50 border border-red-200 rounded-[10px] p-[15px] mb-[20px]">
            <p className="small-text font-NeueMontreal text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <label className="paragraph font-NeueMontreal text-secondry">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-[#21212155] rounded-[10px] px-[20px] py-[15px] paragraph font-NeueMontreal focus:outline-none focus:border-[#145B52] transition-colors"
              placeholder="admin@viladalbert.cz"
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <label className="paragraph font-NeueMontreal text-secondry">
              Heslo
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-[#21212155] rounded-[10px] px-[20px] py-[15px] paragraph font-NeueMontreal focus:outline-none focus:border-[#145B52] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondry text-white py-[15px] rounded-[50px] paragraph font-NeueMontreal uppercase hover:bg-[#0F1F1C] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-[20px]">
            {loading ? 'Přihlašování...' : 'Přihlásit se'}
          </button>
        </form>

        <div className="mt-[30px] text-center">
          <Link href="/" className="small-text font-NeueMontreal text-gray-600 hover:text-secondry transition-colors">
            ← Zpět na web
          </Link>
        </div>
      </div>
    </div>
  );
}
